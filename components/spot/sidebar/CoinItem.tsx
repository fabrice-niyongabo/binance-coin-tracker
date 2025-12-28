import { useAppContext } from "@/context";
import { IPriceData, ISpotMarketData } from "@/types/market";
import {
  binanceCryptoIcons,
  binanceEtfIcons,
  binanceCurrencyIcons,
} from "binance-icons";
import Image from "next/image";
import { memo } from "react";

interface IProps {
  coin: ISpotMarketData;
  priceData?: IPriceData;
  isSelected: boolean;
}

function CoinItem({ coin, priceData, isSelected }: IProps) {
  const { setSelectedSpotMarketData } = useAppContext();

  const handleClick = () => {
    setSelectedSpotMarketData(coin);
    setTimeout(() => {
      window.open(
        `https://www.binance.com/en/trade/${coin.baseAsset}_${coin.quoteAsset}?_from=markets&type=spot`,
        "_blank"
      );
    }, 200);
  };

  return (
    <div
      className={[
        "flex items-center justify-between gap-2 py-2 px-5 hover:bg-yellow-900 transition-all duration-800 hover:cursor-pointer",
        isSelected ? "bg-yellow-900" : "",
      ].join(" ")}
      onClick={() => handleClick()}
    >
      <div>
        {binanceCryptoIcons.has(coin.baseAsset.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/crypto/" +
              coin.baseAsset.toLowerCase() +
              ".svg"
            }
            alt={coin.baseAsset}
            width={25}
            height={25}
          />
        ) : binanceCurrencyIcons.has(coin.baseAsset.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/currency/" +
              coin.baseAsset.toLowerCase() +
              ".svg"
            }
            alt={coin.baseAsset}
            width={25}
            height={25}
          />
        ) : binanceEtfIcons.has(coin.baseAsset.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/etf/" +
              coin.baseAsset.toLowerCase() +
              ".svg"
            }
            alt={coin.baseAsset}
            width={25}
            height={25}
          />
        ) : (
          <div
            style={{ width: 25, height: 25 }}
            className="flex items-center justify-center rounded-full border border-gray-50"
          >
            <span className="text-white" style={{ fontSize: 10 }}>
              {coin.baseAsset.charAt(0)}
              {coin.quoteAsset.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="text-white text-lg font-semibold flex-1">
        {coin.baseAsset}/{coin.quoteAsset}
      </p>
      <div className="flex flex-col items-end">
        <p
          className={[
            "text-gray-500 font-semibold",
            priceData?.direction === "up" ? "text-green-500" : "",
            priceData?.direction === "down" ? "text-red-500" : "",
            priceData?.direction === "none" ? "text-red-400" : "",
          ].join(" ")}
        >
          {priceData?.price || 0}
        </p>
        {priceData?.priceChangePercent && (
          <p
            className={`text-sm ${
              parseFloat(priceData.priceChangePercent) >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {parseFloat(priceData.priceChangePercent).toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(CoinItem);
