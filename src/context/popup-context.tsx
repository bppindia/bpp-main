import React, { createContext, ReactNode, useContext, useState } from "react";

interface PopupContextType {
  showVerificationPopup: boolean;
  setShowVerificationPopup: (value: boolean) => void;
  showPaymentPopup: boolean;
  setShowPaymentPopup: (value: boolean) => void;
  paymentSubmitted: boolean;
  setPaymentSubmitted: (value: boolean) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(true);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        showVerificationPopup,
        setShowVerificationPopup,
        showPaymentPopup,
        setShowPaymentPopup,
        paymentSubmitted,
        setPaymentSubmitted,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within a PopupProvider");
  return context;
};