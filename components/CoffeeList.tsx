"use client";
import React from "react";
import Image from "next/image";
import { coffeeList } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAddToCartStore } from "@/stores/add_to_cart_store";
const CoffeeList = () => {
  const { addToCartItem, items } = useAddToCartStore();

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-row items-end content-end gap-2 mb-5">
        <Image alt="" src={"/menu_images/coffee.png"} width={50} height={50} />
        <h1 className="text-3xl font-bold">COFFEE</h1>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {coffeeList.map((coffee, i) => {
          const isAvailable = coffee.quantity > 1;
          const isAddedToCart = items.includes(coffee);
          return (
            <div
              className="h-80 w-full border-2 rounded-2xl overflow-hidden flex flex-col"
              key={i}
            >
              <div className="relative h-[70%] w-full">
                <Image
                  alt=""
                  src={coffee.imageSrc}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  loading="eager"
                />
              </div>
              <div className="h-[40%] p-4">
                <h2 className="text-xl font-bold">{coffee.name}</h2>
                <p
                  className={cn(
                    "text-sm font-medium",
                    isAvailable ? "text-gray-600" : "text-red-500",
                  )}
                >
                  {isAvailable ? "Available" : "Not-available"}
                </p>
                <div className="flex justify-between py-3">
                  <p className="font-bold">₱{coffee.price.toFixed(2)}</p>
                  <Button
                    className="bg-[#A47251] cursor-pointer"
                    onClick={() => addToCartItem(coffee)}
                    disabled={isAddedToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoffeeList;
