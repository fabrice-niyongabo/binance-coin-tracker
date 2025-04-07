"use client";
import { useAppContext } from "@/context";
import { IPriceData } from "@/types/market";
import { useEffect, useState } from "react";

export function useWebSocket() {
  const [status, setStatus] = useState("Connecting...");
  const [prices, setPrices] = useState<Record<string, IPriceData>>({});

  const { spotMarketData, setSpotMarketPrices } = useAppContext();

  useEffect(() => {
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
        const { s: symbol, c: currentPrice, E: timestamp } = message.data;

        setPrices((prev) => {
          const previousPrice = parseFloat(prev[symbol]?.price || "0");
          const newPrice = parseFloat(currentPrice);

          return {
            ...prev,
            [symbol]: {
              symbol: symbol.toUpperCase(),
              price: currentPrice,
              direction:
                newPrice > previousPrice
                  ? "up"
                  : newPrice < previousPrice
                  ? "down"
                  : "none",
              lastUpdated: timestamp,
            },
          };
        });
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

    // Cleanup on component unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [spotMarketData]);

  useEffect(() => {
    setSpotMarketPrices(prices);
  }, [prices]);

  return { prices, status };
}
