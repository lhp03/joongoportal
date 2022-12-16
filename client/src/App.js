import { Route, Routes } from "react-router-dom";
import VisitTracker from "./components/VisitTracker";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

function App() {
  VisitTracker();
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search/:keyword" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
