import { Card } from "@web3uikit/core";
import Image from "next/image";

function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
  //   console.log(address);
}

const NftBox = (props) => {
  const { owner, symbol, tokenId, nftAddress, price, image } = props;
  formatAddress(nftAddress);
  return (
    <div className="w-80 flex justify-center">
      <Card>
        <Image src={image} alt="NFT Image" width={100} height={100} />
        <div className="flex justify-between">
          <p>{symbol}</p>
          <p>{`#${tokenId}`}</p>
        </div>
        <div className="flex justify-between">
          <p>Owner:</p>
          <p>{formatAddress(owner)}</p>
        </div>
        <div className="flex justify-between">
          <p>Address:</p>
          <p>{formatAddress(nftAddress)}</p>
        </div>
        <div className="flex justify-between">
          <p>Price:</p>
          <p className="text-lg font-bold text-black">{`${price} ETH`}</p>
        </div>
      </Card>
    </div>
  );
};

export default NftBox;
