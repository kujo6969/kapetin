import { useAddToCartStore } from "@/stores/add_to_cart_store";
import Image from "next/image";
import { Button } from "./ui/button";
import OrderTotal from "./OrderTotal";
import OrderType from "./OrderType";
import PaymentType from "./PaymentType";
import { useState } from "react";
import { CheckoutSessionResponse } from "@/types";

const BillingWeb = () => {
  const { items, addQuantity, minusQuantity, removeItem } = useAddToCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const arrangeItems = items.toReversed();

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) throw new Error("Failed to create checkout session");

      const { url }: CheckoutSessionResponse = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 h-screen flex flex-col fixed overflow-auto">
      <h1 className="text-2xl font-bold mb-4">BILLING</h1>
      <div className="flex-1 overflow-y-auto max-h-100">
        {arrangeItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
            <p className="text-lg font-medium">Your cart is empty</p>
          </div>
        ) : (
          arrangeItems.map((item, i) => {
            const totalPrice = item.price * item.quantity;
            return (
              <div
                className="w-full h-30 border-2 my-3 rounded-3xl p-2"
                key={i}
              >
                <div className="flex items-center h-full">
                  <div className="relative h-full w-28">
                    <Image
                      alt={item.name}
                      src={item.imageSrc}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="100%"
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
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id, item.category);
                            } else {
                              minusQuantity(item.id, item.category);
                            }
                          }}
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          className="bg-[#A47251]"
                          onClick={() => addQuantity(item.id, item.category)}
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
          })
        )}
      </div>
      <OrderTotal totalPrice={total} totalItems={items.length} />
      <OrderType />
      <PaymentType />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button
        className="w-full h-15 bg-[#A47251] cursor-pointer font-bold "
        disabled={loading || items.length === 0}
        onClick={handleCheckout}
      >
        {loading ? "Redirecting..." : "Checkout"}
      </Button>
    </div>
  );
};

export default BillingWeb;
