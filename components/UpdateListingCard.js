import { Card } from "@web3uikit/core";
import { useState } from "react";

const UpdateListingCard = ({ style, onClose, onConfirm }) => {
  const [inputPrice, setInputPrice] = useState("");
  const handleCancelBtn = (e) => {
    e.preventDefault();
    onClose();
  };
  const confirmUpdate = (e) => {
    e.preventDefault();
    console.log("submit");
    onConfirm(inputPrice);
  };
  console.log(inputPrice);
  return (
    <Card style={{ ...style }}>
      <div>
        <form onSubmit={confirmUpdate}>
          <input
            className="rounded-lg p-2 bg-white min-w-full"
            name="new price"
            placeholder="New price in ETH"
            type="decimal"
            min="0.00000000001"
            onChange={(e) => setInputPrice(e.target.value)}
          ></input>
          <button
            type="submit"
            className=" mt-4 bg-indigo-500 min-w-full h-8 flex items-center justify-center align-middle text-white p-2 rounded-lg hover:bg-indigo-300"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelBtn}
            className="border-2 border-gray min-w-full h-8 flex items-center justify-center align-middle text-gray p-2 rounded-lg hover:bg-indigo-100 hover:text-black"
          >
            Cancel
          </button>
        </form>
      </div>
    </Card>
  );
};

export default UpdateListingCard;
