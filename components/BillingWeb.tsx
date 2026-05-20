import { useAddToCartStore } from "@/stores/add_to_cart_store";
import { coffeeList } from "@/types";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { MinusIcon } from "lucide-react";
import OrderTotal from "./OrderTotal";
import OrderType from "./OrderType";
import PaymentType from "./PaymentType";

const BillingWeb = () => {
  const { items, addQuantity, minusQuantity } = useAddToCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="p-5 h-screen flex flex-col ">
      <h1 className="text-2xl font-bold mb-4">BILLING</h1>
      <div className="flex-1 overflow-y-auto max-h-100">
        {items.map((item, i) => {
          const totalPrice = item.price * item.quantity;
          return (
            <div className="w-full h-30 border-2 my-3 rounded-3xl p-2" key={i}>
              <div className="flex items-center h-full">
                <div className="relative h-full w-28">
                  <Image
                    alt={item.name}
                    src={item.imageSrc}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="100vw"
                    loading="eager"
                  />
                </div>
                <div className="flex flex-col pl-2 w-full">
                  <p className="font-bold text-md">{item.name}</p>
                  <p className="font-medium text-gray-500 pb-2">
                    {item.category}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="w-20 flex justify-between items-center">
                      <Button
                        className="bg-[#A47251]"
                        onClick={() => minusQuantity(item.id)}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button
                        className="bg-[#A47251]"
                        onClick={() => addQuantity(item.id)}
                      >
                        +
                      </Button>
                    </div>

                    <p className="text-base font-bold">
                      {totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <OrderTotal totalPrice={total} totalItems={items.length} />
      <OrderType />
      <PaymentType />
      <Button className="w-full h-15 bg-[#A47251] cursor-pointer font-bold ">Process Transaction</Button>
    </div>
  );
};

export default BillingWeb;
