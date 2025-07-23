import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import { useEffect, type ReactNode } from 'react';
import { COLOR_MODE } from '../constants/CTheme';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { setDarkTheme } from '../stores/slices/appSlice';

type TProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: TProps) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector(state => state.app.isDarkTheme);

  const theme = createTheme({
    palette: { mode: isDarkMode ? COLOR_MODE.DARK : COLOR_MODE.LIGHT },
  });

  useEffect(() => {
    dispatch(setDarkTheme(prefersDark));
  }, [prefersDark, dispatch]);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </>
  );
}
