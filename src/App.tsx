import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import "./App.css";
import NotificationProvider from "./notifications/NotificationProvider";
import MAinPage from "./pages/PageTwo";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { setThemeOptions } from "./stores/slices/appSlice";
import { darkOptions, lightOptions } from "./theme";

function App() {
  const isDark = useAppSelector((state) => state.app.isDarkTheme);
  const dispatch = useAppDispatch();
  const options = isDark ? darkOptions : lightOptions;
  // Create theme dynamically based on dark mode
  const theme = createTheme(options);
  useEffect(() => {
    // Set the theme options in the app slice
    dispatch(setThemeOptions(options));
  }, [isDark, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <MAinPage />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
