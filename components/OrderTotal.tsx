import React from "react";

type Props = {
  totalPrice: number;
  totalItems: number;
};

const OrderTotal = ({ totalPrice, totalItems }: Props) => {
  console.log(totalPrice);
  return (
    <div className="px-3">
      <hr className="border-t-2 border-dotted border-gray-400" />
      <div className="flex flex-row justify-between pt-7">
        <p className="text-gray-500 font-bold text-sm">Items</p>
        <p className="text-gray-500 font-bold text-sm">{totalItems} items</p>
      </div>
      <div className="flex flex-row justify-between pt-3">
        <p className="text-gray-500 font-bold text-sm">Subtotal</p>
        <p className="text-gray-500 font-bold text-sm">
          Php {totalPrice.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-row justify-between pt-3">
        <p className="text-gray-500 font-bold text-sm">Discount</p>
        <p className="text-gray-500 font-bold text-sm">Php 0.00</p>
      </div>
      <hr className="border-t-2 border-dotted border-gray-400 my-3" />
      <div className="flex flex-row justify-between">
        <p className="font-bold">TOTAL</p>
        <p className="font-bold">Php {totalPrice.toFixed(2)}</p>
      </div>
      <hr className="border-t-2 border-dotted border-gray-400 my-3" />
    </div>
  );
};

export default OrderTotal;
