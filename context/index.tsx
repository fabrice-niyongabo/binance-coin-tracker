"use client";

import { IMarketData } from "@/types/market";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  marketData: IMarketData[];
  setMarketData: (marketData: IMarketData[]) => void;
  selectedMarketData: IMarketData | undefined;
  setSelectedMarketData: (selectedMarketData: IMarketData | undefined) => void;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [marketData, setMarketData] = useState<IMarketData[]>([]);
  const [selectedMarketData, setSelectedMarketData] = useState<
    IMarketData | undefined
  >(undefined);
  return (
    <AppContext.Provider
      value={{
        marketData,
        setMarketData,
        selectedMarketData,
        setSelectedMarketData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("context must be used within a AppContextProvider");
  }
  return context;
};
