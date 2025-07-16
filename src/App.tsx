import "./App.css";
import NotificationProvider from "./notifications/NotificationProvider";
import PageTwo from "./pages/PageTwo";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <PageTwo />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
