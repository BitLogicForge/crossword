import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { setGridWidth } from '../stores/slices/crossSlice';

export default function WidthSlider() {
  const reduxWidth = useAppSelector(state => state.cross.gridSize.width);
  const dispatch = useAppDispatch();
  const [localWidth, setLocalWidth] = useState(reduxWidth);
  const { t } = useTranslation();
  return (
    <Box sx={{ px: 2, mb: 2 }}>
      <Typography gutterBottom>
        {t('labels.width')}: {localWidth}
      </Typography>
      <Slider
        value={localWidth}
        min={5}
        max={20}
        step={1}
        onChange={(_event, value) => setLocalWidth(Array.isArray(value) ? value[0] : value)}
        onChangeCommitted={(_event, value) => dispatch(setGridWidth(Array.isArray(value) ? value[0] : value))}
        valueLabelDisplay='auto'
        aria-label='Width Size'
      />
    </Box>
  );
}
