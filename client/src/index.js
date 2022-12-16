import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";
import { hydrate, render } from "react-dom";

if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  console.log("HIHI");
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
