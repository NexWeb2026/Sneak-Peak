import { PolicyPage } from "@/components/policies/PolicyPage";

export default function ShippingPage() {
  return (
    <PolicyPage eyebrow="South Africa delivery" title="Shipping policy">
      <section>
        <h2>Where we deliver</h2>
        <p className="mt-4">
          Sneak-Peak delivers to valid street addresses within South Africa. We do not currently ship internationally or to PO boxes. Some farms, townships, mines, estates, and remote areas may require an alternative collection point or additional delivery time.
        </p>
      </section>

      <section>
        <h2>Processing and delivery estimates</h2>
        <p className="mt-4">
          Orders are normally prepared within one to two business days after payment confirmation. Estimated courier delivery is two to five business days for major centres and three to seven business days for regional or remote areas. These are estimates, not guaranteed dates, and exclude weekends and South African public holidays.
        </p>
      </section>

      <section>
        <h2>Delivery fees and tracking</h2>
        <p className="mt-4">
          Standard delivery is currently free within South Africa. Any exceptional surcharge will be disclosed before you place the order. A tracking link will be sent when the courier collects your parcel. The courier may require a signature, PIN, or proof of identity at delivery.
        </p>
      </section>

      <section>
        <h2>Address changes and failed delivery</h2>
        <p className="mt-4">
          Check your delivery details before submitting the order and contact <strong>[support email]</strong> immediately if they are incorrect. We cannot guarantee a change after dispatch. Reasonable redelivery or return-to-sender costs caused by an incorrect address or repeated unavailable delivery attempts may be charged where lawful and disclosed.
        </p>
      </section>

      <section>
        <h2>Delays, loss, or damage</h2>
        <p className="mt-4">
          Contact us promptly if tracking has not moved, a parcel is marked delivered but cannot be found, or packaging arrives damaged. We will investigate with the courier. Risk remains with Sneak-Peak until the goods are delivered to you or a person you authorised to receive them, subject to applicable law.
        </p>
      </section>
    </PolicyPage>
  );
}
