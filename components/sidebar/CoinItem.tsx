import { useAppContext } from "@/context";
import { splitSymbol } from "@/lib/utils";
import { IMarketData } from "@/types/market";
import {
  binanceCryptoIcons,
  binanceEtfIcons,
  binanceCurrencyIcons,
} from "binance-icons";
import Image from "next/image";

interface IProps {
  coin: IMarketData;
}

function CoinItem({ coin }: IProps) {
  const { base, quote } = splitSymbol(coin.symbol);
  const { setSelectedMarketData } = useAppContext();

  return (
    <div
      className="flex items-center justify-between gap-2 py-2 px-5"
      onClick={() => setSelectedMarketData(coin)}
    >
      <div>
        {binanceCryptoIcons.has(base.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/crypto/" +
              base.toLowerCase() +
              ".svg"
            }
            alt={base}
            width={20}
            height={20}
          />
        ) : binanceCurrencyIcons.has(base.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/currency/" +
              base.toLowerCase() +
              ".svg"
            }
            alt={base}
            width={20}
            height={20}
          />
        ) : binanceEtfIcons.has(base.toLowerCase()) ? (
          <Image
            src={
              "https://raw.githubusercontent.com/VadimMalykhin/binance-icons/main/etf/" +
              base.toLowerCase() +
              ".svg"
            }
            alt={base}
            width={20}
            height={20}
          />
        ) : (
          <div
            style={{ width: 20, height: 20 }}
            className="flex items-center justify-center rounded-full border border-gray-50"
          >
            <span className="text-white" style={{ fontSize: 10 }}>
              {base.charAt(0)}
              {quote.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="text-white text-sm flex-1">
        {base}/{quote}
      </p>
      <p className="text-gray-500">{coin.lastPrice}</p>
    </div>
  );
}

export default CoinItem;
