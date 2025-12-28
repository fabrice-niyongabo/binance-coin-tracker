import { useAppContext } from "@/context";
import { useMemo, useState } from "react";
import { ISpotMarketData } from "@/types/market";
import CoinItem from "./CoinItem";
import { useWebSocket } from "@/hooks/useSpotWebSocket";

interface IProps {
  marketData: ISpotMarketData[];
}

function CoinList(props: IProps) {
  // socket
  const { prices } = useWebSocket();
  const { selectedSpotMarketData } = useAppContext();

  const [sortBy, setSortBy] = useState<"name" | "gainer">("gainer");

  const sortedData = useMemo(() => {
    const data = [...props.marketData];
    if (sortBy === "name") {
      return data.sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));
    } else {
      return data.sort((a, b) => {
        const priceA = prices[a.symbol]?.priceChangePercent;
        const priceB = prices[b.symbol]?.priceChangePercent;

        const valA = priceA ? parseFloat(priceA) : -Infinity;
        const valB = priceB ? parseFloat(priceB) : -Infinity;

        return valB - valA;
      });
    }
  }, [props.marketData, prices, sortBy]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 px-2 text-xs text-gray-400 mb-2 border-b border-gray-700 pb-2">
        {/* <button
          className={`hover:text-white transition-colors ${
            sortBy === "name"
              ? "text-white font-bold border-b-2 border-blue-500"
              : ""
          }`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button> */}
        <button
          className={`hover:text-white transition-colors ${
            sortBy === "gainer"
              ? "text-white font-bold border-b-2 border-blue-500"
              : ""
          }`}
          onClick={() => setSortBy("gainer")}
        >
          Top Gainers
        </button>
      </div>
      {sortedData.map((coin) => (
        <CoinItem
          key={coin.symbol}
          coin={coin}
          priceData={prices[coin.symbol]}
          isSelected={selectedSpotMarketData?.symbol === coin.symbol}
        />
      ))}
    </div>
  );
}

export default CoinList;
