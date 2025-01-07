import i18n from "@/modules/I18n/i18n";
import AppRoutes from "@/router/Routes";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { useLocation } from "react-router-dom";
import { initializeAnalytics, trackPageView } from "./analytics";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();

  useEffect(() => {
    const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    initializeAnalytics(gaMeasurementId);
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
