"use client";

import { useAppContext } from "@/context";
import { IMarketData } from "@/types/market";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinList from "./CoinList";
import Paginator from "../paginator";
import { splitSymbol } from "@/lib/utils";

function SideBar() {
  const { marketData, setMarketData } = useAppContext();

  const [keyword, setKeword] = useState("");
  const [searchResults, setSearchResults] = useState<IMarketData[]>([]);

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const itemsToShow = marketData.slice(
    itemOffset > marketData.length ? 0 : itemOffset,
    endOffset
  );
  const pageCount = Math.ceil(marketData.length / itemsPerPage);
  const fetchMartetData = async () => {
    try {
      const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const marketData = response.data as IMarketData[];

      const filterData = marketData
        .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
        .filter((item) => splitSymbol(item.symbol).quote === "USDT");

      setMarketData(filterData);
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
      const searchResults = marketData.filter((item) =>
        splitSymbol(item.symbol)
          .base.toLowerCase()
          .includes(keyword.toLowerCase())
      );
      setSearchResults(searchResults);
    } else {
      setSearchResults(marketData);
    }
  }, [keyword, marketData]);
  return (
    <div className="fixed left-0 bg-gray-900 h-screen w-80">
      <div className="h-full flex flex-col justify-between gap-3">
        <div className="px-5 py-2">
          <input
            type="text"
            placeholder="Search coin..."
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
