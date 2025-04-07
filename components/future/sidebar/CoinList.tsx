import { useEffect } from "react";
import Paginator from "../../paginator";
import { ISpotMarketData } from "@/types/market";
import CoinItem from "./CoinItem";
import { useAppContext } from "@/context";
import { useFutureWebSocket } from "@/hooks/useFutureWebSocket";

interface IProps {
  marketData: ISpotMarketData[];
}

function CoinList(props: IProps) {
  const { prices, status } = useFutureWebSocket();
  const { setFutureMarketPrices } = useAppContext();

  useEffect(() => {
    setFutureMarketPrices(prices);
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
