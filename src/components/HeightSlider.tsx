import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { setGridHeight } from '../stores/slices/crossSlice';

export default function HeightSlider() {
  const reduxHeight = useAppSelector(state => state.cross.gridSize.height);
  const dispatch = useAppDispatch();
  const [localHeight, setLocalHeight] = useState(reduxHeight);
  const { t } = useTranslation();
  return (
    <Box sx={{ px: 2, mb: 2 }}>
      <Typography gutterBottom>
        {t('labels.height')}: {localHeight}
      </Typography>
      <Slider
        value={localHeight}
        min={5}
        max={20}
        step={1}
        onChange={(_event, value) => setLocalHeight(Array.isArray(value) ? value[0] : value)}
        onChangeCommitted={(_event, value) => dispatch(setGridHeight(Array.isArray(value) ? value[0] : value))}
        valueLabelDisplay='auto'
        aria-label='Height Size'
      />
    </Box>
  );
}
