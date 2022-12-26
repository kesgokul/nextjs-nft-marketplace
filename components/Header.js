import { ConnectButton } from "@web3uikit/web3";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const currentRouter = router.pathname;
  return (
    <header className="border-b-2 py-2">
      <div className="grid sm:flex sm:justify-between">
        <h1 className="text-5xl font-thin flex justify-center mb-2">
          NFT Marketplace
        </h1>
        <ConnectButton className="flex justify-center " moralisAuth={false} />
      </div>
      <nav className="flex justify-center gap-2 mt-5">
        <Link
          className={`hover:text-indigo-300 ${
            currentRouter === "/" ? "text-indigo-500" : ""
          }`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`hover:text-indigo-300 ${
            currentRouter === "/sellNfts" ? "text-indigo-500" : ""
          }`}
          href="/sellNfts"
        >
          Sell NFTs
        </Link>
        <Link
          className={`hover:text-indigo-300 ${
            currentRouter === "/token" ? "text-indigo-500" : ""
          }`}
          href="/token"
        >
          tokenUri
        </Link>
      </nav>
    </header>
  );
};

export default Header;
