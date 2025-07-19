import { DIRECTION, SYMBOL, type TDirection } from "../constants/CApp";
import type { TWord } from "../types/general";

export type TWordPlacement = {
  word: string;
  x: number;
  y: number;
  direction: TDirection;
};

type TCrosswordGrid = {
  grid: string[][];
  gridFilled: string[][];
  placements: TWordPlacement[];
  width: number;
  height: number;

};

export class MyCrosswordGenerator {
  public cross: TCrosswordGrid;
  public noPlace: TWord[] = [];

  constructor(width: number, height: number, words: TWord[]) {
    this.cross = {
      width,
      height,
      grid: [],
      gridFilled: [],
      placements: [],

    };
    this.clearGrid();
    this.generateCrosswords(words);
  }
  private clearGrid(): void {
    this.cross.grid = Array(this.cross.height)
      .fill(null)
      .map(() => Array(this.cross.width).fill(SYMBOL.EMPTY));
    this.cross.placements = [];
  }

  private generateCrosswords(words: TWord[]): void {

    // const sortedWords = [...words].sort((a, b) => b.label.length - a.label.length);
    const sortedWords = [...words]
    // words to uppercase
    sortedWords.forEach((word, index) => {
      sortedWords[index] = { ...word, label: word.label.toUpperCase() };
    });
    sortedWords.forEach((word) => {
      const placements = this.listPossiblePlacements(word.label);
      if (placements.length === 0) {
        console.warn(`No placements found for word: ${word}`);
        this.noPlace.push(word);
        return;
      }
      const placement =
        placements[Math.floor(Math.random() * placements.length)];
      this.placeWord(placement);
    });
  }
  private placeWord(placement: TWordPlacement): void {
    this.cross.placements.push(placement);
    this.refreshGrid();
    console.log(
      `Placing word "${placement.word}" at (${placement.x}, ${placement.y}) ${placement.direction})`
    );
  }
  private refreshGrid(): void {
    this.cross.grid = Array(this.cross.height)
      .fill(null)
      .map(() => Array(this.cross.width).fill(SYMBOL.EMPTY));
    this.cross.placements.forEach((placement) => {
      const { word, x, y, direction } = placement;
      if (direction === DIRECTION.H) {
        for (let i = 0; i < word.length; i++) {
          this.cross.grid[y][x + i] = word[i];
        }
      } else {
        for (let i = 0; i < word.length; i++) {
          this.cross.grid[y + i][x] = word[i];
        }
      }
    });
  }

  public printGrid(): void {
    this.cross.grid.forEach((row) => {
      console.log(row.join(" "));
    });
  }
  public printPossiblePlacements(word: string): void {
    const placements = this.listPossiblePlacements(word);
    placements.forEach((placement) => {
      console.log(
        `${placement.word} can be placed at (${placement.x}, ${placement.y}) ${placement.direction}`
      );
    });
  }
  public printPlacements(): void {
    this.cross.placements.forEach((placement) => {
      console.log(
        `${placement.word} at (${placement.x}, ${placement.y}) ${placement.direction}`
      );
    });
  }

  private listPossiblePlacements(word: string): TWordPlacement[] {
    const placements: TWordPlacement[] = [];
    for (let y = 0; y < this.cross.height; y++) {
      for (let x = 0; x < this.cross.width; x++) {
        if (this.canPlaceWord(word, x, y, DIRECTION.H)) {
          placements.push({ word, x, y, direction: DIRECTION.H });
        }
        if (this.canPlaceWord(word, x, y, DIRECTION.V)) {
          placements.push({ word, x, y, direction: DIRECTION.V });
        }
      }
    }
    return placements;
  }
  public fillGridWithRandomLetters(): void {
    // Copy the crossword grid to gridFilled
    this.cross.gridFilled = this.cross.grid.map((row) => [...row]);
    for (let y = 0; y < this.cross.height; y++) {
      for (let x = 0; x < this.cross.width; x++) {
        if (this.cross.gridFilled[y][x] === SYMBOL.EMPTY) {
          this.cross.gridFilled[y][x] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }
  }

  private canPlaceWord(
    word: string,
    x: number,
    y: number,
    direction: TDirection
  ): boolean {
    if (direction === DIRECTION.H) {
      if (x + word.length > this.cross.width) return false;
      for (let i = 0; i < word.length; i++) {
        if (
          this.cross.grid[y][x + i] !== SYMBOL.EMPTY &&
          this.cross.grid[y][x + i] !== word[i]
        ) {
          return false;
        }
      }
    } else {
      if (y + word.length > this.cross.height) return false;
      for (let i = 0; i < word.length; i++) {
        if (
          this.cross.grid[y + i][x] !== SYMBOL.EMPTY &&
          this.cross.grid[y + i][x] !== word[i]
        ) {
          return false;
        }
      }
    }
    return true;
  }
}
