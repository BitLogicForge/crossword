import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import HeightSlider from "../components/HeightSlider";
import LetterCell from "../components/LetterCell";
import WidthSlider from "../components/WidthSlider";
import { MyCrosswordGenerator } from "../logic/mycross";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleTheme } from "../stores/slices/appSlice";

export default function PageTwo() {
  const gridSize = useAppSelector((state) => state.cross.gridSize);
  const [cgen, setCgen] = useState(() => {
    const generator = new MyCrosswordGenerator(gridSize.width, gridSize.height);
    generator.fillGridWithRandomLetters();
    return generator;
  });
  const [showFilled, setShowFilled] = useState(false);

  function handleRegenerate() {
    const generator = new MyCrosswordGenerator(gridSize.width, gridSize.height);
    generator.fillGridWithRandomLetters();
    setCgen(generator);
  }

  const isDarkMode = useAppSelector((state) => state.app.isDarkTheme);
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
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
              onChange={() => setShowFilled((prev) => !prev)}
              color="primary"
            />
          }
          label={showFilled ? "Show Filled Grid" : "Show Crossword Grid"}
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
        <Table sx={{ width: "fit-content", margin: "auto" }}>
          <TableBody>
            {(showFilled ? cgen["cross"].gridFilled : cgen["cross"].grid).map(
              (row, rowIdx) => (
                <TableRow key={rowIdx}>
                  {row.map((cell, colIdx) => (
                    <LetterCell key={`${rowIdx}-${colIdx}`} letter={cell} />
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
