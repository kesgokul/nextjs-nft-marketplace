import styles from "./Header.module.css";
import { ConnectButton } from "@web3uikit/web3";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <h1>NFT Marketplace</h1>
      <div className={styles["nav-links"]}>
        <Link href="/">Home</Link>
        <Link href="/sellNfts">Sell NFTs</Link>
      </div>
      <ConnectButton moralisAuth={false} />
    </header>
  );
};

export default Header;
