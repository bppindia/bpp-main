import ReactGA from "react-ga4";

export const initializeAnalytics = (measurementId: string): void => {
  ReactGA.initialize(measurementId);
};

export const trackPageView = (path: string): void => {
  ReactGA.send({ hitType: "pageview", page: path });
};
