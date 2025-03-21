import { useState } from "react";
import Paginator from "../paginator";
import { IMarketData } from "@/types/market";
import CoinItem from "./CoinItem";

interface IProps {
  marketData: IMarketData[];
}

function CoinList(props: IProps) {
  return (
    <div className="flex flex-col gap-3">
      {props.marketData.map((coin, index) => (
        <CoinItem key={index} coin={coin} />
      ))}
    </div>
  );
}

export default CoinList;
