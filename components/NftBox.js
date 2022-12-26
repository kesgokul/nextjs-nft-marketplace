import { Card } from "@web3uikit/core";
import Image from "next/image";
import { useWeb3, useMoralis } from "react-moralis";
import basicNftAbi from "../constants/BasicNft.json";
import marketplaceAbi from "../constants/Nftmarketplace.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import UpdateListingCard from "./UpdateListingCard";

function formatAddress(address) {
  return address.slice(0, 6) + "...." + address.slice(-4);
  //   console.log(address);
}

const NftBox = ({ owner, tokenId, nftAddress, price, marketplace }) => {
  // let signer;
  const [signer, setSigner] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isUpdatingListing, setIsUpdatingListing] = useState(false);
  const { isWeb3Enabled, account, web3 } = useMoralis();

  formatAddress(nftAddress);

  // ///////// getTokenURI() and buyItem() using react-moralis -------- throws unpredicable
  // ///////// gas error.
  // const { runContractFunction: getTokenURI } = useWeb3Contract({
  //   abi: basicNftAbi,
  //   contractAddress: nftAddress,
  //   functionName: "tokenURI",
  //   params: {
  //     tokenId: tokenId,
  //   },
  // });

  // const { runContractFunction: buyItem } = useWeb3Contract({
  //   abi: Nftmarketplace,
  //   contractAddress: marketplace,
  //   functionName: "buyItem",
  //   params: {
  //     nftAddress: nftAddress,
  //     tokenId: tokenId,
  //   },
  // });

  /////// getting token uri using vanilla ethers
  const getTokenURI = async () => {
    const basicNft = new ethers.Contract(nftAddress, basicNftAbi, signer);
    const tx = await basicNft.tokenURI(tokenId, {
      gasLimit: 1000000000,
    });
    const uriUrl = tx.replace("ipfs://", "https://ipfs.io/ipfs/");
    const uriResponse = await (await fetch(uriUrl)).json();
    const imageUri = uriResponse.image;
    setSymbol(uriResponse.name);
    const imageUriUrl = imageUri.replace("ipfs://", "https://ipfs/ipfs/");
    setImageUrl(imageUriUrl);
  };

  const buyItem = async () => {
    const nftMarketplace = new ethers.Contract(
      marketplace,
      marketplaceAbi,
      signer
    );
    try {
      const tx = await nftMarketplace.buyItem(nftAddress, tokenId, {
        value: price,
      });
      console.log(tx);
    } catch (e) {
      console.log(e);
    }
  };

  const updateListing = async (newPrice) => {
    const newPriceEth = ethers.utils.parseEther(newPrice);
    const nftMarketplace = new ethers.Contract(
      marketplace,
      marketplaceAbi,
      signer
    );

    nftMarketplace.connect(signer);

    nftMarketplace
      .updatePrice(nftAddress, tokenId, newPriceEth)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    // listing for the ItemListed event (means tx confirmation)
    nftMarketplace.on("ItemListed", (e) => {
      console.log(e);
    });
  };

  function checkIfOwner() {
    if (account === owner) {
      setIsOwner(true);
      // console.log(isOwner);
    }
  }

  async function getSigner() {
    const ethereum = window.ethereum;
    const provider = await new ethers.providers.Web3Provider(ethereum);
    const currSigner = await provider.getSigner(account);
    setSigner(currSigner);
    console.log(signer);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      // updateUI();
      // getSigner();
      // getTokenURI();

      const currSigner = web3.getSigner();
      // setSigner(() => {
      //   signer = currSigner;
      // });

      checkIfOwner();
      console.log(currSigner);
    }
  }, [isWeb3Enabled]);

  const handleCardClick = () => {
    isOwner
      ? setIsUpdatingListing(true)
      : buyItem({
          onError: (error) => console.log(error),
          onSuccess: () => {
            console.log("item Bought successfully");
          },
        });
  };

  const handleCancelUpdate = () => {
    setIsUpdatingListing(false);
  };

  return (
    <div className="w-80 flex justify-center">
      <Card style={{ background: "yellow", position: "relative" }}>
        <div className="rounded-lg">
          <Image
            loader={() => imageUrl}
            src={imageUrl}
            alt="NFT Image"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-between mt-2 ">
          <p className="font-bold">{symbol}</p>
          <p>{`#${tokenId}`}</p>
        </div>
        <div className="flex justify-between">
          <p>Address:</p>
          <p>{formatAddress(nftAddress)}</p>
        </div>
        <div className="flex justify-between">
          <p>Owner:</p>
          <p>{isOwner ? "You" : formatAddress(owner)}</p>
        </div>
        <div className="flex justify-between">
          <p>Price:</p>
          <p className="text-lg font-bold text-black">{`${ethers.utils.formatEther(
            price
          )} ETH`}</p>
        </div>
        <button
          className="bg-indigo-500 min-w-full h-8 flex items-center justify-center align-middle text-white p-2 rounded-lg hover:bg-indigo-300"
          onClick={handleCardClick}
        >
          {isOwner ? "Update Price" : "Buy"}
        </button>
        {isOwner && (
          <button className="border-2 border-gray min-w-full h-8 flex items-center justify-center align-middle text-gray p-2 rounded-lg hover:bg-indigo-100 hover:text-black">
            Cancel listing
          </button>
        )}
        {isUpdatingListing && (
          <UpdateListingCard
            onClose={handleCancelUpdate}
            onConfirm={updateListing}
            signer={signer}
            style={{ position: "absolute", inset: "0" }}
          />
        )}
      </Card>
    </div>
  );
};

export default NftBox;
