import { PolicyPage } from "@/components/policies/PolicyPage";

export default function PrivacyPage() {
  return (
    <PolicyPage eyebrow="POPIA notice" title="Privacy notice">
      <section>
        <h2>Responsible party</h2>
        <p className="mt-4">
          <strong>[registered legal entity]</strong>, trading as Sneak-Peak, is the responsible party for personal information processed through this store. The Information Officer can be contacted at <strong>[privacy email]</strong> or <strong>[South African street address]</strong>.
        </p>
      </section>

      <section>
        <h2>Information we process</h2>
        <p className="mt-4">We may process:</p>
        <ul className="mt-3">
          <li>Identity and contact details, including your name, email address, and mobile number.</li>
          <li>Delivery and order information, including your address, purchases, returns, and support messages.</li>
          <li>Payment status and transaction references received from our payment provider, but not full card details.</li>
          <li>Device, cookie, and website usage information used for security, essential functionality, and consented analytics.</li>
        </ul>
      </section>

      <section>
        <h2>Why we use it</h2>
        <p className="mt-4">
          We process information to take payment, fulfil and deliver orders, provide customer support, prevent fraud, meet tax and legal obligations, improve the store, and send marketing only where permitted. We collect only information reasonably needed for a defined purpose and do not reuse it incompatibly.
        </p>
      </section>

      <section>
        <h2>Sharing and transfers</h2>
        <p className="mt-4">
          Information may be shared with <strong>[commerce platform]</strong>, <strong>[payment provider]</strong>, couriers, hosting and security providers, professional advisers, and authorities where legally required. Contracts and appropriate safeguards must be used where a service provider processes information outside South Africa.
        </p>
      </section>

      <section>
        <h2>Retention and security</h2>
        <p className="mt-4">
          We keep personal information only for as long as required for the stated purpose, legal recordkeeping, disputes, and fraud prevention, then securely delete or de-identify it. Reasonable technical and organisational safeguards are used to protect information, and qualifying security compromises will be handled under POPIA.
        </p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <p className="mt-4">
          Subject to POPIA, you may request access to your personal information, ask us to correct or delete it, object to certain processing, withdraw consent, or unsubscribe from direct marketing. You may also lodge a complaint with the <a href="https://inforegulator.org.za/">Information Regulator South Africa</a>. Identity verification may be required before we act on a request.
        </p>
      </section>
    </PolicyPage>
  );
}
