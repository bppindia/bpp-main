// src/context/PopupContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
    showVerificationPopup: boolean;
    setShowVerificationPopup: (show: boolean) => void;
    showPaymentPopup: boolean;
    setShowPaymentPopup: (show: boolean) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

    return (
        <PopupContext.Provider
            value={{
                showVerificationPopup,
                setShowVerificationPopup,
                showPaymentPopup,
                setShowPaymentPopup,
            }}
        >
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = (): PopupContextType => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
};