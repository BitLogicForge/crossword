interface WordPlacement {
  word: string;
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
}

interface CrosswordGrid {
  grid: string[][];
  placements: WordPlacement[];
  width: number;
  height: number;
}

class CrosswordGenerator {
  private grid: string[][];
  private width: number;
  private height: number;
  private placements: WordPlacement[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(""));
  }

  // Check if a word can be placed at given position and direction
  private canPlaceWord(
    word: string,
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ): boolean {
    if (direction === "horizontal") {
      // Check if word fits horizontally
      if (x + word.length > this.width) return false;

      // Check if position is available
      for (let i = 0; i < word.length; i++) {
        if (this.grid[y][x + i] !== "" && this.grid[y][x + i] !== word[i]) {
          return false;
        }
      }
    } else {
      // Check if word fits vertically
      if (y + word.length > this.height) return false;

      // Check if position is available
      for (let i = 0; i < word.length; i++) {
        if (this.grid[y + i][x] !== "" && this.grid[y + i][x] !== word[i]) {
          return false;
        }
      }
    }
    return true;
  }

  // Place a word on the grid
  private placeWord(
    word: string,
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ): void {
    if (direction === "horizontal") {
      for (let i = 0; i < word.length; i++) {
        this.grid[y][x + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        this.grid[y + i][x] = word[i];
      }
    }

    this.placements.push({ word, x, y, direction });
  }

  // Calculate score for a placement (higher is better)
  private calculatePlacementScore(
    word: string,
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ): number {
    let score = 0;

    if (direction === "horizontal") {
      for (let i = 0; i < word.length; i++) {
        if (this.grid[y][x + i] === word[i]) {
          score += 10; // Bonus for crossing existing letters
        }
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        if (this.grid[y + i][x] === word[i]) {
          score += 10; // Bonus for crossing existing letters
        }
      }
    }

    // Prefer more central positions
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    score += Math.max(0, 50 - distanceFromCenter);

    return score;
  }

  // Find the best position for a word
  private findBestPosition(word: string): {
    x: number;
    y: number;
    direction: "horizontal" | "vertical";
    score: number;
  } | null {
    let bestPosition = null;
    let bestScore = -1;

    // Try both directions
    for (const direction of ["horizontal", "vertical"] as const) {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          if (this.canPlaceWord(word, x, y, direction)) {
            const score = this.calculatePlacementScore(word, x, y, direction);
            if (score > bestScore) {
              bestScore = score;
              bestPosition = { x, y, direction, score };
            }
          }
        }
      }
    }

    return bestPosition;
  }

  // Generate crossword from list of words
  generateCrossword(words: string[]): CrosswordGrid {
    // Reset grid and placements
    this.grid = Array(this.height)
      .fill(null)
      .map(() => Array(this.width).fill(""));
    this.placements = [];

    // Sort words by length (longer words first for better placement)
    const sortedWords = [...words].sort((a, b) => b.length - a.length);

    // Place first word in the center
    if (sortedWords.length > 0) {
      const firstWord = sortedWords[0];
      const centerX = Math.floor((this.width - firstWord.length) / 2);
      const centerY = Math.floor(this.height / 2);

      if (this.canPlaceWord(firstWord, centerX, centerY, "horizontal")) {
        this.placeWord(firstWord, centerX, centerY, "horizontal");
      }
    }

    // Place remaining words
    for (let i = 1; i < sortedWords.length; i++) {
      const word = sortedWords[i];
      const bestPosition = this.findBestPosition(word);

      if (bestPosition) {
        this.placeWord(
          word,
          bestPosition.x,
          bestPosition.y,
          bestPosition.direction
        );
      }
    }

    return {
      grid: this.grid.map((row) => [...row]),
      placements: [...this.placements],
      width: this.width,
      height: this.height,
    };
  }
}

// Function to print crossword grid
function printCrossword(
  crossword: CrosswordGrid,
  options: {
    fillBlanks?: boolean;
    randomLetters?: boolean;
    showNumbers?: boolean;
    cellSeparator?: string;
  } = {}
): string {
  const {
    fillBlanks = false,
    randomLetters = false,
    showNumbers = false,
    cellSeparator = " ",
  } = options;

  const grid = crossword.grid.map((row) => [...row]);

  // Fill blanks with random letters if requested
  if (fillBlanks) {
    for (let y = 0; y < crossword.height; y++) {
      for (let x = 0; x < crossword.width; x++) {
        if (grid[y][x] === "") {
          if (randomLetters) {
            grid[y][x] = String.fromCharCode(
              65 + Math.floor(Math.random() * 26)
            );
          } else {
            grid[y][x] = "·";
          }
        }
      }
    }
  }

  // Add numbers to word starting positions if requested
  if (showNumbers) {
    crossword.placements.forEach((placement, index) => {
      const number = (index + 1).toString();
      const cell = grid[placement.y][placement.x];
      grid[placement.y][placement.x] =
        cell === "" ? number : `${number}${cell}`;
    });
  }

  // Convert grid to string
  let result = "";
  for (let y = 0; y < crossword.height; y++) {
    const row = grid[y].map((cell) => (cell === "" ? "·" : cell.toUpperCase()));
    result += row.join(cellSeparator) + "\n";
  }

  return result;
}

// Function to print word list with clues
function printWordList(crossword: CrosswordGrid): string {
  let result = "\nWord List:\n";
  result += "─".repeat(30) + "\n";

  crossword.placements.forEach((placement, index) => {
    const direction = placement.direction === "horizontal" ? "Across" : "Down";
    result += `${
      index + 1
    }. ${placement.word.toUpperCase()} (${direction}) - Position: (${
      placement.x + 1
    }, ${placement.y + 1})\n`;
  });

  return result;
}

// Main function to generate crossword
function generateCrossword(
  words: string[],
  width: number,
  height: number
): CrosswordGrid {
  const generator = new CrosswordGenerator(width, height);
  return generator.generateCrossword(words);
}

// Example usage:
const words = [
  "TFP",
  "NUDE",
  "NUDE",
  "NUDE",
  "NUDE",
  "NUDE",
  "TOPLESS",
  "TOPLESS",
  "TOPLESS",
  "TOPLESS",
  "PORTRIAIT",
  "NAKED",
  "NAKED",
  "NAKED",
  "ASS",
  "ASS",
  "BOOBIES",
  "PORTRAIT",
  "BDSM",
  "BDSM",
];
const crossword = generateCrossword(words, 15, 15);

console.log("Crossword Grid:");
console.log(printCrossword(crossword));

console.log("\nWith filled blanks:");
console.log(printCrossword(crossword, { fillBlanks: true }));

console.log("\nWith random letters:");
console.log(
  printCrossword(crossword, { fillBlanks: true, randomLetters: true })
);

console.log("\nWith numbers:");
console.log(printCrossword(crossword, { showNumbers: true }));

console.log(printWordList(crossword));
