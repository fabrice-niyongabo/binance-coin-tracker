import { useAppContext } from "@/context";
import { ISpotMarketData } from "@/types/market";
import {
  binanceCryptoIcons,
  binanceEtfIcons,
  binanceCurrencyIcons,
} from "binance-icons";
import Image from "next/image";

interface IProps {
  coin: ISpotMarketData;
}

function CoinItem({ coin }: IProps) {
  const {
    setSelectedFutureMarketData,
    selectedFutureMarketData,
    futureMarketPrices,
  } = useAppContext();

  const handleClick = () => {
    setSelectedFutureMarketData(coin);
    setTimeout(() => {
      window.open(
        `https://www.binance.com/en/futures/${coin.symbol}`,
        "_blank"
      );
    }, 200);
  };

  return (
    <div
      className={[
        "flex items-center justify-between gap-2 py-2 px-5 hover:bg-yellow-900 transition-all duration-800 hover:cursor-pointer",
        selectedFutureMarketData?.symbol === coin.symbol ? "bg-yellow-900" : "",
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
            width={20}
            height={20}
          />
        ) : binanceCurrencyIcons.has(coin.baseAsset.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/currency/" +
              coin.baseAsset.toLowerCase() +
              ".svg"
            }
            alt={coin.baseAsset}
            width={20}
            height={20}
          />
        ) : binanceEtfIcons.has(coin.baseAsset.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/etf/" +
              coin.baseAsset.toLowerCase() +
              ".svg"
            }
            alt={coin.baseAsset}
            width={20}
            height={20}
          />
        ) : (
          <div
            style={{ width: 20, height: 20 }}
            className="flex items-center justify-center rounded-full border border-gray-50"
          >
            <span className="text-white" style={{ fontSize: 10 }}>
              {coin.baseAsset.charAt(0)}
              {coin.quoteAsset.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="text-white text-sm flex-1">
        {coin.baseAsset}/{coin.quoteAsset}
      </p>
      <p
        className={[
          "text-gray-500",
          futureMarketPrices[coin.symbol]?.direction === "up"
            ? "text-green-500"
            : "",
          futureMarketPrices[coin.symbol]?.direction === "down"
            ? "text-red-500"
            : "",
          futureMarketPrices[coin.symbol]?.direction === "none"
            ? "text-red-400"
            : "",
        ].join(" ")}
      >
        {futureMarketPrices[coin.symbol]?.price || 0}
      </p>
    </div>
  );
}

export default CoinItem;
