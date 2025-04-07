import { useEffect, useState } from "react";
import Paginator from "../../paginator";
import { IMarketData, ISpotMarketData } from "@/types/market";
import CoinItem from "./CoinItem";
import { useWebSocket } from "@/hooks/useSpotWebSocket";
import { useAppContext } from "@/context";

interface IProps {
  marketData: ISpotMarketData[];
}

function CoinList(props: IProps) {
  // socket
  const { prices, status } = useWebSocket();
  const { setSpotMarketPrices } = useAppContext();

  useEffect(() => {
    setSpotMarketPrices(prices);
  }, [prices]);
  return (
    <div className="flex flex-col gap-3">
      {props.marketData.map((coin, index) => (
        <CoinItem key={index} coin={coin} />
      ))}
    </div>
  );
}

export default CoinList;
