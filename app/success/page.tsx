// app/success/page.tsx
import { stripe } from "@/lib/stripe";
import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">Invalid session.</p>
        <Link href="/" className="mt-4 text-[#A47251] underline">
          Go back home
        </Link>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items"],
  });

  const items = session.line_items?.data ?? [];
  const amountTotal = (session.amount_total ?? 0) / 100;
  const customerEmail = session.customer_details?.email ?? "";
  const customerName = session.customer_details?.name ?? "";

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      {/* Checkmark */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-500 mb-6">
        Thank you, {customerName}! A receipt was sent to {customerEmail}.
      </p>

      {/* Order summary */}
      <div className="w-full max-w-sm border-2 rounded-3xl p-4 mb-6 text-left">
        <h2 className="font-bold text-lg mb-3">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-1 text-sm">
            <span>
              {item.description} × {item.quantity}
            </span>
            <span className="font-medium">
              ${((item.amount_total ?? 0) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t mt-3 pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>${amountTotal.toFixed(2)}</span>
        </div>
      </div>

      <Link
        href="/"
        className="w-full max-w-sm bg-[#A47251] text-white font-bold py-3 rounded-xl text-center block"
      >
        Back to Home
      </Link>
    </div>
  );
}
