"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  return (
    <div className="bg-gray-900 p-5 text-white flex items-center justify-between gap-10">
      <h3>Coin Tracker - 24 Change</h3>
      <div className="flex items-center justify-center gap-5">
        <a
          href="/"
          className={[
            "hover:text-yellow-500 active:text-yellow-500",
            pathname == "/" ? "text-yellow-500" : "",
          ].join(" ")}
        >
          Sport Market
        </a>
        <a
          href="/futures"
          className={[
            "hover:text-yellow-500 active:text-yellow-500",
            pathname == "/futures" ? "text-yellow-500" : "",
          ].join(" ")}
        >
          USD M Futures
        </a>
      </div>
    </div>
  );
}

export default Navbar;
