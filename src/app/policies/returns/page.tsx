import { PolicyPage } from "@/components/policies/PolicyPage";

export default function ReturnsPage() {
  return (
    <PolicyPage eyebrow="Customer care" title="Returns and refunds">
      <section>
        <h2>Online cooling-off period</h2>
        <p className="mt-4">
          For eligible online purchases, the Electronic Communications and Transactions Act allows you to cancel without reason or penalty within seven days after receiving the goods. You may be responsible only for the direct cost of returning goods under this cooling-off right. A qualifying refund will be made within 30 days of cancellation.
        </p>
      </section>

      <section>
        <h2>30-day goodwill returns</h2>
        <p className="mt-4">
          In addition to statutory rights, you may request a return within 30 days after delivery if the sneakers are unworn, unwashed, unaltered, and returned with their original box, labels, and accessories. This goodwill policy does not limit any right you have under South African law. Return delivery costs for a change of mind may be deducted from the refund where lawful and disclosed before collection.
        </p>
      </section>

      <section>
        <h2>Defective or incorrect goods</h2>
        <p className="mt-4">
          Under the Consumer Protection Act, goods must be safe, of good quality, and fit for purpose. If goods fail those standards within six months after delivery, you may return them without penalty and at our risk and expense, and choose a repair, replacement, or refund as provided by the Act. Incorrect items or goods damaged in transit will also be collected or returned at our cost.
        </p>
      </section>

      <section>
        <h2>Starting a return</h2>
        <p className="mt-4">
          Contact <strong>[returns email]</strong> with your order number, the item being returned, and the reason. Include clear photographs for damage, defects, or an incorrect item. We will provide return instructions and, where applicable, arrange collection. Do not send a return before receiving instructions.
        </p>
      </section>

      <section>
        <h2>Refunds</h2>
        <p className="mt-4">
          Approved refunds are made to the original payment method. Bank processing times may apply after the refund is issued. Original delivery charges and return costs are handled according to the reason for return and applicable law. Gift cards are not exchanged for cash except where the law requires it.
        </p>
      </section>
    </PolicyPage>
  );
}
