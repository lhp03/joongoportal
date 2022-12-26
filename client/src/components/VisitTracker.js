import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

const VisitTracker = () => {
  const location = useLocation();
  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
    }
  }, []);

  useEffect(() => {
    if (initialize) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialize, location]);
};

export default VisitTracker;
