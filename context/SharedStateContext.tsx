import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of your shared state
interface SharedState {
    activeTheme: number;
    isDark: boolean;
    setActiveTheme: (theme: number) => void;
    toggleDarkTheme: () => void;
}

const SharedStateContext = createContext<SharedState | undefined>(undefined);

export const SharedStateProvider = ({ children }: { children: ReactNode }) => {
    const [activeTheme, setActiveTheme] = useState<number>(1);
    const [isDark, setIsDark] = useState<boolean>(false);

    // Toggle the dark theme state
    const toggleDarkTheme = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <SharedStateContext.Provider value={{ activeTheme, isDark, setActiveTheme, toggleDarkTheme }}>
            {children}
        </SharedStateContext.Provider>
    );
};

// Custom hook to use the shared state
export const useSharedState = (): SharedState => {
    const context = useContext(SharedStateContext);
    if (!context) {
        throw new Error("useSharedState must be used within a SharedStateProvider");
    }
    return context;
};
