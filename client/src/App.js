import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PricePage from "./pages/PricePage";
import RouteChangeTracker from "./components/RouteChangeTracker";

function App() {
  RouteChangeTracker();
  const theme = createTheme({
    typography: {
      fontFamily: "Spoqa Han Sans Neo",
    },
    palette: {
      primary: {
        main: "#512da8",
      },
    },
  });
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
