"use client";

import { useAppContext } from "@/context";
import { IMarketData, IPriceData, ISpotMarketData } from "@/types/market";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinList from "./CoinList";
import Paginator from "../../paginator";
import { splitSymbol } from "@/lib/utils";
import { FutureBinanceTicker } from "@/types/future";

function SideBar() {
  const { futureMarketData, setFutureMarketData, setFutureMarketBasePrices } =
    useAppContext();

  const [keyword, setKeword] = useState("");
  const [searchResults, setSearchResults] = useState<ISpotMarketData[]>([]);

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const itemsToShow = futureMarketData.slice(
    itemOffset > futureMarketData.length ? 0 : itemOffset,
    endOffset
  );
  const pageCount = Math.ceil(futureMarketData.length / itemsPerPage);
  const fetchMartetData = async () => {
    try {
      // base prices
      const baseRes = await axios.get(
        "https://fapi.binance.com/fapi/v1/ticker/24hr"
      );
      const basePriceAllData: FutureBinanceTicker[] = baseRes.data;
      const usdBasePriceData: FutureBinanceTicker[] = basePriceAllData.filter(
        (item) => item.symbol.includes("USDT")
      );
      const basePrices: Record<string, IPriceData> = {};
      for (const price of usdBasePriceData) {
        basePrices[price.symbol.toUpperCase()] = {
          symbol: price.symbol.toUpperCase(),
          price: price.lastPrice,
          priceChangePercent: price.priceChangePercent,
          direction: "none",
          lastUpdated: price.closeTime,
        };
      }
      setFutureMarketBasePrices(basePrices);

      // exchange info
      const response = await axios.get(
        "https://fapi.binance.com/fapi/v1/exchangeInfo"
      );
      const marketData: ISpotMarketData[] =
        response.data.symbols || ([] as ISpotMarketData[]);

      const filterData = marketData
        // .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
        .filter(
          (item) => item.status === "TRADING" && item.quoteAsset === "USDT"
        )
        .sort((a, b) =>
          a.baseAsset.toLowerCase().localeCompare(b.baseAsset.toLowerCase())
        );

      setFutureMarketData(filterData);
      setSearchResults(filterData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMartetData();
  }, []);

  useEffect(() => {
    if (keyword) {
      const searchResults = futureMarketData.filter((item) =>
        item.baseAsset.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(searchResults);
    } else {
      setSearchResults(futureMarketData);
    }
  }, [keyword, futureMarketData]);
  return (
    <div className="fixed left-0 bg-gray-900 h-screen w-80">
      <div className="h-full flex flex-col justify-between gap-3">
        <div className="px-5 py-2">
          <input
            type="text"
            placeholder="Search USD M futures market..."
            value={keyword}
            onChange={(e) => setKeword(e.target.value)}
            className="w-full bg-gray-800 rounded-lg border border-gray-700 focus:border-gray-500 focus:outline-none p-2 text-xs placeholder:text-gray-400 text-white"
          />
        </div>
        <div className="overflow-y-auto flex-1">
          <CoinList marketData={searchResults} />
        </div>
        {/* <div>
          <Paginator
            itemsPerPage={itemsPerPage}
            pageCount={pageCount}
            setItemOffset={setItemOffset}
            setItemsPerPage={setItemsPerPage}
            tableData={marketData}
          />
        </div> */}
      </div>
    </div>
  );
}

export default SideBar;
