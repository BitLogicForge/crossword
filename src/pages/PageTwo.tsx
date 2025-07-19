import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import CrossGrid from "../components/CrossGrid";
import HeightSlider from "../components/HeightSlider";
import WidthSlider from "../components/WidthSlider";
import WordAdd from "../components/WordAdd";
import WordsList from "../components/WordsList";
import { MyCrosswordGenerator } from "../logic/mycross";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleTheme } from "../stores/slices/appSlice";
import {
  setCurrentGrid,
  setCurrentGridFilled,
  setNoPlaceWords,
  toggleFilledGrid,
} from "../stores/slices/crossSlice";

export default function PageTwo() {
  const gridSize = useAppSelector((state) => state.cross.gridSize);
  const words = useAppSelector((state) => state.cross.words);
  const showFilled = useAppSelector((state) => state.cross.showFilled);
  const grid = useAppSelector((state) => state.cross.currentGrid);
  const dispatch = useAppDispatch();

  function handleRegenerate() {
    const generator = new MyCrosswordGenerator(
      gridSize.width,
      gridSize.height,
      words
    );
    generator.fillGridWithRandomLetters();
    dispatch(setNoPlaceWords(generator.noPlace));
    dispatch(setCurrentGrid(generator.cross.grid));
    dispatch(setCurrentGridFilled(generator.cross.gridFilled));
  }
  useEffect(() => {
    if (grid.length === 0 || grid[0].length === 0) {
      handleRegenerate();
    }
  }, []);

  const isDarkMode = useAppSelector((state) => state.app.isDarkTheme);

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Crossword Grid
        </Typography>
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Switch
            checked={isDarkMode}
            onChange={() => dispatch(toggleTheme())}
          />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Toggle Dark mode
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <WidthSlider />
          <HeightSlider />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={showFilled}
              onChange={() => dispatch(toggleFilledGrid())}
            />
          }
          label={showFilled ? "Filled Grid" : "Just Words"}
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRegenerate()}
          >
            Regenerate Grid
          </Button>
        </Box>
      </Paper>
      <Paper sx={{ mt: 1, p: 3 }}>
        <CrossGrid />
      </Paper>
      <Paper sx={{ mt: 1, p: 3 }}>
        <WordAdd />
        <WordsList />
      </Paper>
    </Container>
  );
}
