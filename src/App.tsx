import i18n from "@/modules/I18n/i18n";
import AppRoutes from "@/router/Routes";
import { I18nextProvider } from "react-i18next";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </I18nextProvider>
      </Provider>
    </>
  );
}

export default App;
