import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SYMBOL } from "../constants/CApp";
import { MyCrosswordGenerator } from "../logic/mycross";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleTheme } from "../stores/slices/appSlice";

export default function PageTwo() {
  const [gridSize, setGridSize] = useState(20);
  const [cgen, setCgen] = useState(() => {
    const generator = new MyCrosswordGenerator(gridSize, gridSize);
    generator.fillGridWithRandomLetters();
    return generator;
  });
  const [showFilled, setShowFilled] = useState(false);

  const handleRegenerate = (size = gridSize) => {
    const generator = new MyCrosswordGenerator(size, size);
    generator.fillGridWithRandomLetters();
    setCgen(generator);
  };

  const handleSliderChange = (_event: Event, value: number | number[]) => {
    const size = Array.isArray(value) ? value[0] : value;
    setGridSize(size);
    handleRegenerate(size);
  };
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
          <Typography gutterBottom>
            Grid Size: {gridSize} x {gridSize}
          </Typography>
          {/* Slider from MUI */}
          <Box sx={{ px: 2, mb: 2 }}>
            <Slider
              value={gridSize}
              min={5}
              max={30}
              step={1}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-label="Grid Size"
            />
          </Box>
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
                    <TableCell key={colIdx} sx={{ p: 0, m: 0, border: 0 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          fontWeight: "bold",
                          fontSize: 18,

                          borderRadius: 2,
                          backgroundColor:
                            cell === SYMBOL.EMPTY
                              ? "secondary.main"
                              : "primary.main",
                          color:
                            cell === SYMBOL.EMPTY
                              ? "secondary.contrastText"
                              : "primary.contrastText",

                          margin: "2px",
                        }}
                      >
                        {cell}
                      </Box>
                    </TableCell>
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
