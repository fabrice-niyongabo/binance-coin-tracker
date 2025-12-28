"use client";
import { useAppContext } from "@/context";
import { IPriceData } from "@/types/market";
import { useEffect, useRef, useState } from "react";

export function useFutureWebSocket() {
  const [status, setStatus] = useState("Connecting...");
  const [prices, setPrices] = useState<Record<string, IPriceData>>({});

  const { futureMarketData, setFutureMarketPrices } = useAppContext();

  // Use a ref to store the latest prices
  const pricesRef = useRef<Record<string, IPriceData>>({});

  useEffect(() => {
    if (futureMarketData.length === 0) return;

    const symbols = futureMarketData.map((s) => s.symbol.toLowerCase());
    const streams = symbols.map((s) => `${s}@ticker`).join("/");

    // Create WebSocket connection
    const ws = new WebSocket(
      `wss://fstream.binance.com/stream?streams=${streams}`
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
      const newPrices = { ...pricesRef.current };
      setPrices(newPrices);
      setFutureMarketPrices(newPrices);
    }, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(interval);
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [futureMarketData, setFutureMarketPrices]);

  return { prices, status };
}
