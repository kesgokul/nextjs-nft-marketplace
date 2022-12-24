import { Card } from "@web3uikit/core";
import Image from "next/image";
import { useWeb3Contract, useMoralis } from "react-moralis";
import basicNftAbi from "../constants/BasicNft.json";
import { ethers } from "ethers";
import { useEffect } from "react";

function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
  //   console.log(address);
}

const NftBox = ({
  owner,
  symbol = "RAS",
  tokenId,
  nftAddress,
  price,
  marketplace,
}) => {
  const { isWeb3Enabled } = useMoralis();

  formatAddress(nftAddress);

  // 1. get the token uri by calling the contract
  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: basicNftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });

  async function updateUI() {
    const uriResponse = await getTokenURI();
    console.log(uriResponse);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="w-80 flex justify-center">
      <Card>
        <Image src="" alt="NFT Image" width={100} height={100} />
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
          <p className="text-lg font-bold text-black">{`${ethers.utils.formatEther(
            price
          )} ETH`}</p>
        </div>
      </Card>
    </div>
  );
};

export default NftBox;
