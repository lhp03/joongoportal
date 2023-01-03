import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (
      process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID &&
      !window.location.href.includes("localhost")
    ) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    ReactGA.set({ page: location.pathname });
    ReactGA.send("pageview");
  }, [location]);
};

export default RouteChangeTracker;
