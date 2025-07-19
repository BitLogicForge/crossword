import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

export default function MainPage() {
  const gridSize = useAppSelector((state) => state.cross.gridSize);
  const words = useAppSelector((state) => state.cross.words);
  const showFilled = useAppSelector((state) => state.cross.showFilled);
  const grid = useAppSelector((state) => state.cross.currentGrid);
  const { t } = useTranslation();
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
        <Box
          sx={{
            backgroundColor: "primary.light",
            borderRadius: 2,
            py: 2,
            px: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              color: "primary.contrastText",
              letterSpacing: 2,
            }}
          >
            {t("labels.title")}
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
          label={showFilled ? t("labels.filledGrid") : t("labels.justWords")}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={() => dispatch(toggleTheme())}
            />
          }
          label={isDarkMode ? t("labels.darkMode") : t("labels.lightMode")}
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRegenerate()}
          >
            {t("labels.regenerate")}
          </Button>
        </Box>
      </Paper>
      <Paper
        sx={{
          mt: 1,
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Chip label={t("labels.title")} variant="outlined" size="small" />
        </Box>
        <CrossGrid />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Chip
            label="https://bitlogicforge.github.io/crossword"
            variant="outlined"
            size="small"
          />
        </Box>
      </Paper>
      <Paper sx={{ mt: 1, p: 3 }}>
        <WordAdd />
        <WordsList />
      </Paper>
    </Container>
  );
}
