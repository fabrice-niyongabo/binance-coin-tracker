"use client";
import { useAppContext } from "@/context";
import { IPriceData } from "@/types/market";
import { useEffect, useRef, useState } from "react";

export function useWebSocket() {
  const [status, setStatus] = useState("Connecting...");
  const [prices, setPrices] = useState<Record<string, IPriceData>>({});

  const { spotMarketData, setSpotMarketPrices } = useAppContext();

  // Use a ref to store the latest prices to avoid frequent state updates
  const pricesRef = useRef<Record<string, IPriceData>>({});

  useEffect(() => {
    if (spotMarketData.length === 0) return;

    const symbols = spotMarketData.map((s) => s.symbol.toLowerCase());
    const streams = symbols.map((s) => `${s}@ticker`).join("/");

    // Create WebSocket connection
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onopen = () => {
      setStatus("Connected to Binance WebSocket");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.data) {
        const {
          s: symbol,
          c: currentPrice,
          P: priceChangePercent,
          E: timestamp,
        } = message.data;
        const upperSymbol = symbol.toUpperCase();

        const previousPrice = parseFloat(
          pricesRef.current[upperSymbol]?.price || "0"
        );
        const newPrice = parseFloat(currentPrice);

        // Update the ref
        pricesRef.current[upperSymbol] = {
          symbol: upperSymbol,
          price: currentPrice,
          priceChangePercent: priceChangePercent,
          direction:
            newPrice > previousPrice
              ? "up"
              : newPrice < previousPrice
              ? "down"
              : "none",
          lastUpdated: timestamp,
        };
      }
    };

    ws.onerror = (error) => {
      setStatus("Connection error");
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      setStatus("Disconnected");
      console.log("WebSocket closed");
    };

    // Update state and context periodically
    const interval = setInterval(() => {
      // Create a new object to trigger re-renders
      const newPrices = { ...pricesRef.current };
      setPrices(newPrices);
      setSpotMarketPrices(newPrices);
    }, 1000); // Update every 1 second

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [spotMarketData, setSpotMarketPrices]);

  return { prices, status };
}
