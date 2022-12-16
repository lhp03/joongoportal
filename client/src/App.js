import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import ReactGA from "react-ga";

ReactGA.event({
  category: "User",
  action: "Created an Account",
});
ReactGA.exception({
  description: "An error ocurred",
  fatal: true,
});

function App() {
  useEffect(() => {
    ReactGA.initialize("G-B1HK8Z9PQQ");
    history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search/:keyword" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
