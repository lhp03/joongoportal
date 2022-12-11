import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search/:keyword" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
