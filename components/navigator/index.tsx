"use client";

import { useAppContext } from "@/context";
import { splitSymbol } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import {
  binanceCryptoIcons,
  binanceEtfIcons,
  binanceCurrencyIcons,
} from "binance-icons";
import Image from "next/image";
import { FaSadTear } from "react-icons/fa";
import { useState } from "react";

function Navigator() {
  const { selectedMarketData, setSelectedMarketData, marketData } =
    useAppContext();

  const [nextLoading, setNextLoading] = useState(false);
  const [previousLoading, setPreviousLoading] = useState(false);

  const handleNext = () => {
    if (selectedMarketData) {
      setNextLoading(true);
      const currentIndex = marketData.findIndex(
        (item) => item.symbol === selectedMarketData.symbol
      );
      const nextCoin = marketData[currentIndex + 1];
      if (!nextCoin) {
        setNextLoading(false);
        return;
      }
      setSelectedMarketData(nextCoin);
      setTimeout(() => {
        window.open(
          `https://www.binance.com/en/trade/${
            splitSymbol(nextCoin.symbol).base
          }_${splitSymbol(nextCoin.symbol).quote}?_from=markets&type=spot`,
          "_blank"
        );
        setNextLoading(false);
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (selectedMarketData) {
      setPreviousLoading(true);
      const currentIndex = marketData.findIndex(
        (item) => item.symbol === selectedMarketData.symbol
      );
      const previousCoin = marketData[currentIndex - 1];
      if (!previousCoin) {
        setPreviousLoading(false);
        return;
      }
      setSelectedMarketData(previousCoin);
      setTimeout(() => {
        window.open(
          `https://www.binance.com/en/trade/${
            splitSymbol(previousCoin.symbol).base
          }_${splitSymbol(previousCoin.symbol).quote}?_from=markets&type=spot`,
          "_blank"
        );
        setPreviousLoading(false);
      }, 1000);
    }
  };
  return (
    <div className="h-full flex items-center justify-center">
      {!selectedMarketData ? (
        <div className="flex items-center justify-center gap-3 flex-col">
          <FaSadTear className="text-6xl text-red-500 opacity-50" />
          <span className=" text-2xl text-red-500">No coin selected</span>
        </div>
      ) : (
        <div className="flex gap-10 items-center justify-center">
          <button
            disabled={
              selectedMarketData.symbol === marketData[0].symbol ||
              previousLoading
            }
            className="bg-gray-900 rounded-full p-10 flex items-center justify-center hover:bg-yellow-500 transition-all duration-800 hover:cursor-pointer shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrevious}
          >
            {previousLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <FaArrowLeft className="text-white text-5xl" />
            )}
          </button>
          <div className="bg-gray-900 rounded-full p-10 flex items-center justify-center min-w-80 gap-2 shadow-md">
            <div>
              {binanceCryptoIcons.has(
                splitSymbol(selectedMarketData.symbol).base.toLowerCase()
              ) ? (
                <Image
                  src={
                    "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/crypto/" +
                    splitSymbol(selectedMarketData.symbol).base.toLowerCase() +
                    ".svg"
                  }
                  alt={splitSymbol(selectedMarketData.symbol).base}
                  width={80}
                  height={80}
                />
              ) : binanceCurrencyIcons.has(
                  splitSymbol(selectedMarketData.symbol).base.toLowerCase()
                ) ? (
                <Image
                  src={
                    "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/currency/" +
                    splitSymbol(selectedMarketData.symbol).base.toLowerCase() +
                    ".svg"
                  }
                  alt={splitSymbol(selectedMarketData.symbol).base}
                  width={80}
                  height={80}
                />
              ) : binanceEtfIcons.has(
                  splitSymbol(selectedMarketData.symbol).base.toLowerCase()
                ) ? (
                <Image
                  src={
                    "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/etf/" +
                    splitSymbol(selectedMarketData.symbol).base.toLowerCase() +
                    ".svg"
                  }
                  alt={splitSymbol(selectedMarketData.symbol).base}
                  width={80}
                  height={80}
                />
              ) : (
                <div
                  style={{ width: 80, height: 80 }}
                  className="flex items-center justify-center rounded-full border border-gray-50"
                >
                  <span className="text-white" style={{ fontSize: 10 }}>
                    {splitSymbol(selectedMarketData.symbol).base.charAt(0)}
                    {splitSymbol(selectedMarketData.symbol).base.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="text-2xl text-white">
                {splitSymbol(selectedMarketData.symbol).base}/
                {splitSymbol(selectedMarketData.symbol).quote}
              </div>
              <div className="text-2xl text-yellow-500">
                {selectedMarketData.lastPrice}
              </div>
            </div>
          </div>
          <button
            disabled={
              selectedMarketData.symbol ===
                marketData[marketData.length - 1].symbol || nextLoading
            }
            className="bg-gray-900 rounded-full p-10 flex items-center justify-center hover:bg-yellow-500 transition-all duration-800 hover:cursor-pointer shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNext}
          >
            {nextLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <FaArrowRight className="text-white text-5xl" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Navigator;
