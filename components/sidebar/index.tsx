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

      setMarketData(
        marketData
          .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
          .filter((item) => splitSymbol(item.symbol).quote === "USDT")
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMartetData();
  }, []);
  return (
    <div className="fixed left-0 bg-gray-900 h-screen w-80">
      <div className="h-full flex flex-col justify-between gap-3">
        <div className="overflow-y-auto flex-1">
          <CoinList marketData={marketData} />
        </div>
        <div>
          <Paginator
            itemsPerPage={itemsPerPage}
            pageCount={pageCount}
            setItemOffset={setItemOffset}
            setItemsPerPage={setItemsPerPage}
            tableData={marketData}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
