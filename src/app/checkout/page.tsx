import { DemoCheckout } from "@/components/checkout/DemoCheckout";

export default function CheckoutPage() {
  return (
    <main className="min-h-[75vh] bg-background px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <DemoCheckout />
      </div>
    </main>
  );
}
