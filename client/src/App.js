import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import VisitTracker from "./components/VisitTracker";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Spoqa Han Sans Neo",
    },
  });
  VisitTracker();
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
