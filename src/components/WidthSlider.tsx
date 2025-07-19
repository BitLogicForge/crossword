import { Box, Slider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setGridWidth } from "../stores/slices/crossSlice";

export default function WidthSlider() {
  const size = useAppSelector((state) => state.cross.gridSize.width);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ px: 2, mb: 2 }}>
      <Typography gutterBottom>Width: {size}</Typography>
      <Slider
        value={size}
        min={5}
        max={20}
        step={1}
        onChange={(_event, value) => dispatch(setGridWidth(value))}
        valueLabelDisplay="auto"
        aria-label="Width Size"
      />
    </Box>
  );
}
