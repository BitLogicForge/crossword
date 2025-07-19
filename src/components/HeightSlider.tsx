import { Box, Slider, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { setGridHeight } from "../stores/slices/crossSlice";

export default function HeightSlider() {
  const size = useAppSelector((state) => state.cross.gridSize.height);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ px: 2, mb: 2 }}>
      <Typography gutterBottom>Height: {size}</Typography>
      <Slider
        value={size}
        min={5}
        max={20}
        step={1}
        onChange={(_event, value) => dispatch(setGridHeight(value))}
        valueLabelDisplay="auto"
        aria-label="Height Size"
      />
    </Box>
  );
}
