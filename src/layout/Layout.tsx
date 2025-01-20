import ChatSupport from "@/components/chat-support";
import CookieConsent from "@/components/CookieConsent";
import FixedDownload from "@/components/features/fixed-download-banner";
import Footer from "@/components/Footer";
import MainNav from "@/components/navigation/main-nav";
import i18n from "@/modules/I18n/i18n";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        {/* <Navbar /> */}
        <MainNav/>
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <FixedDownload />
        {/* <ScrollToTop /> */}
        <ChatSupport />
      </I18nextProvider>
    </div>
  );
};

export default Layout;
