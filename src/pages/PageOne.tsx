import {
  Box,
  Button,
  Container,
  Paper,
  Switch,
  Typography,
} from "@mui/material";

import { useNotificationDispatch } from "../notifications/useNotificationDispatch";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { toggleTheme } from "../stores/slices/appSlice";

export default function PageOne() {
  const isDarkMode = useAppSelector((state) => state.app.isDarkTheme);
  const dispatch = useAppDispatch();
  const { showNotification } = useNotificationDispatch();
  const handleShowNotification = (
    severity: "success" | "error" | "warning" | "info"
  ) => {
    showNotification(`This is a ${severity} notification!`, severity);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Page One
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is a basic example page using Material UI components. You can use
          this template to quickly build beautiful and responsive interfaces.
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Box>
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Switch
            checked={isDarkMode}
            onChange={() => dispatch(toggleTheme())}
          />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Toggle Dark mode
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => handleShowNotification("success")}
          >
            Show Success
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleShowNotification("error")}
          >
            Show Error
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => handleShowNotification("warning")}
          >
            Show Warning
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={() => handleShowNotification("info")}
          >
            Show Info
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
