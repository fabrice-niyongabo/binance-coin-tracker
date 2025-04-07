import { useAppContext } from "@/context";
import { splitSymbol } from "@/lib/utils";
import { IMarketData, ISpotMarketData } from "@/types/market";
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
  const { setSelectedSpotMarketData, selectedSpotMarketData } = useAppContext();

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
        selectedSpotMarketData?.symbol === coin.symbol ? "bg-yellow-900" : "",
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
      <p className="text-gray-500">{0}</p>
    </div>
  );
}

export default CoinItem;
