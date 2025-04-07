"use client";

import { IMarketData, IPriceData, ISpotMarketData } from "@/types/market";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextProps {
  spotMarketData: ISpotMarketData[];
  setSpotMarketData: (marketData: ISpotMarketData[]) => void;
  futureMarketData: ISpotMarketData[];
  setFutureMarketData: (marketData: ISpotMarketData[]) => void;
  selectedSpotMarketData: ISpotMarketData | undefined;
  setSelectedSpotMarketData: (
    selectedMarketData: ISpotMarketData | undefined
  ) => void;
  spotMarketPrices: Record<string, IPriceData>;
  setSpotMarketPrices: (prices: Record<string, IPriceData>) => void;
  futureMarketPrices: Record<string, IPriceData>;
  setFutureMarketPrices: (prices: Record<string, IPriceData>) => void;
  selectedFutureMarketData: ISpotMarketData | undefined;
  setSelectedFutureMarketData: (
    selectedMarketData: ISpotMarketData | undefined
  ) => void;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [spotMarketData, setSpotMarketData] = useState<ISpotMarketData[]>([]);
  const [selectedSpotMarketData, setSelectedSpotMarketData] = useState<
    ISpotMarketData | undefined
  >(undefined);
  const [spotMarketPrices, setSpotMarketPrices] = useState<
    Record<string, IPriceData>
  >({});

  const [futureMarketData, setFutureMarketData] = useState<ISpotMarketData[]>(
    []
  );
  const [selectedFutureMarketData, setSelectedFutureMarketData] = useState<
    ISpotMarketData | undefined
  >(undefined);
  const [futureMarketPrices, setFutureMarketPrices] = useState<
    Record<string, IPriceData>
  >({});

  return (
    <AppContext.Provider
      value={{
        spotMarketData,
        setSpotMarketData,
        selectedSpotMarketData,
        setSelectedSpotMarketData,
        setSpotMarketPrices,
        spotMarketPrices,
        futureMarketData,
        setFutureMarketData,
        selectedFutureMarketData,
        setSelectedFutureMarketData,
        setFutureMarketPrices,
        futureMarketPrices,
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
