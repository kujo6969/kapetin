import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useOrderTypeStore } from "@/stores/add_to_cart_store";
import { cn } from "@/lib/utils";

const OrderType = () => {
  const { type, selectType } = useOrderTypeStore();

  const orderType = [
    {
      id: 1,
      icon: "/dinein.png",
      description: "Dine In",
    },
    {
      id: 2,
      icon: "/takeout.png",
      description: "Take Out",
    },
  ];

  return (
    <div className="px-3">
      <h1 className="text-lg font-bold">Order Type</h1>
      <div className="flex justify-center items-center content-center pt-3 w-full  md:flex-row">
        {orderType.map((data, i) => (
          <div className="flex px-4" key={i}>
            <Button
              onClick={() => selectType(data.id)}
              className={cn(
                `flex w-25  flex-col h-25 rounded-xl mb-5 bg-[#EEEEEE] shadow-md inset-shadow-sm cursor-pointer`,
                type === data.id ? "inset-shadow-[#DD9E59] bg-[#A47251]" : "",
              )}
            >
              <Image
                alt={data.description}
                src={data.icon}
                width={70}
                height={70}
                loading="eager"
              />
              <p
                className={cn(
                  "text-lg text-black font-bold",
                  type === data.id && "text-white",
                )}
              >
                {data.description}
              </p>
              {type === data.id && (
                <hr className="border-2 border-[#8A5F41] w-[50%]" />
              )}
            </Button>
          </div>
        ))}
      </div>
      <hr className="border-t-2 border-dotted border-gray-400" />
    </div>
  );
};

export default OrderType;
