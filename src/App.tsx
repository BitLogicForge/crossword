import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import NotificationProvider from "./notifications/NotificationProvider";
import MAinPage from "./pages/PageTwo";
import { useAppSelector } from "./stores/hooks";
import { darkOptions, lightOptions } from "./theme";

function App() {
  const isDark = useAppSelector((state) => state.app.isDarkTheme);

  // Create theme dynamically based on dark mode
  const theme = createTheme(isDark ? darkOptions : lightOptions);

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
