import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import VisitTracker from "./components/VisitTracker";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";
import "./App.css";
import PricePage from "./pages/PricePage";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Spoqa Han Sans Neo",
    },
  });
  VisitTracker();
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/price" element={<PricePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
