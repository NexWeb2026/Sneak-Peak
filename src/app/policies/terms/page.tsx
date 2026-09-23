import Link from "next/link";
import { PolicyPage } from "@/components/policies/PolicyPage";

export default function TermsPage() {
  return (
    <PolicyPage eyebrow="Store policies" title="Terms and conditions">
      <section>
        <h2>Supplier information</h2>
        <p className="mt-4">
          This website is operated by <strong>[registered legal entity]</strong>, trading as Sneak-Peak, registration number <strong>[CIPC registration number]</strong>, with its physical and service address at <strong>[South African street address]</strong>. Contact us at <strong>[support email]</strong> or <strong>[telephone number]</strong>. VAT number: <strong>[if applicable]</strong>.
        </p>
      </section>

      <section>
        <h2>Using the store</h2>
        <p className="mt-4">
          These terms apply when you browse the site or place an order for delivery in South Africa. You must be legally capable of entering into a transaction and provide accurate contact, delivery, and payment information. Before submitting an order, you can review and correct the products, quantities, delivery details, and total price.
        </p>
      </section>

      <section>
        <h2>Products, prices and orders</h2>
        <p className="mt-4">
          Prices are displayed in South African rand. VAT is included where Sneak-Peak is required to charge it. Product colour and appearance may vary slightly between screens. An order is an offer to buy; it is accepted when we send an order confirmation after payment approval and stock verification. If we cannot fulfil an order, we will cancel it and refund the amount paid.
        </p>
      </section>

      <section>
        <h2>Delivery and returns</h2>
        <p className="mt-4">
          Delivery estimates and service areas are set out in our <Link href="/policies/shipping">Shipping Policy</Link>. Online customers may have a statutory cooling-off right under the Electronic Communications and Transactions Act, and consumers have quality and defect remedies under the Consumer Protection Act. Our <Link href="/policies/returns">Returns Policy</Link> explains these rights and our additional 30-day goodwill return.
        </p>
      </section>

      <section>
        <h2>Payments and security</h2>
        <p className="mt-4">
          Live payments will be processed by <strong>[payment provider]</strong> under its own terms. We do not store full card details. You authorise us and the provider to process the payment and conduct reasonable fraud checks needed to complete the order.
        </p>
      </section>

      <section>
        <h2>Liability and applicable law</h2>
        <p className="mt-4">
          Nothing in these terms excludes or limits rights or remedies that cannot lawfully be excluded under South African law. Subject to those rights, Sneak-Peak is not responsible for indirect loss that was not reasonably foreseeable. These terms are governed by South African law, and complaints may be referred to an appropriate consumer body or court with jurisdiction.
        </p>
      </section>
    </PolicyPage>
  );
}
