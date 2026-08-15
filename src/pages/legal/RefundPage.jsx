import LegalLayout from './LegalLayout'

export default function RefundPage() {
  return (
    <LegalLayout title="Refund Policy" icon="💳">
      <p className="text-gray-500 text-sm mb-4">Last Updated: August 15, 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">1. Voluntary Donations</h2>
        <p>
          ISKCON KR Puram is a registered non-profit religious and charitable trust. All financial contributions, 
          event sponsorships, and online donations made to the temple are voluntary and are used to support 
          our spiritual, educational, and community service activities.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">2. Erroneous / Double Deductions</h2>
        <p>
          If you have made a donation and believe it was processed in error (e.g., duplicate transaction, incorrect amount 
          entered, or unauthorized card deduction), please contact us immediately to request a review.
        </p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong>Notification window:</strong> You must submit your refund request in writing within **2 working days** of the transaction date.</li>
          <li><strong>Required details:</strong> Please include the donor name, email, transaction amount, transaction ID, and proof of bank deduction with your request.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">3. Exclusions from Refund</h2>
        <p>We are unable to process any refund requests under the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong>Tax Exemption Certificate:</strong> No refunds can be issued if a Tax Exemption Certificate under Section 80G of the Income Tax Act has already been generated or sent to the donor.</li>
          <li><strong>Receipt Return:</strong> If an official physical or digital donation receipt has already been generated, a refund can only be evaluated upon the return or voiding of the original receipt.</li>
          <li><strong>Utilised Seva sponsorships:</strong> Donations specific to custom seva or offerings that have already been conducted on behalf of the devotee cannot be refunded.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">4. Refund Resolution and Timeframes</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong>Review Process:</strong> Once a written complaint is received at our official address or via email, our finance team will review the transaction history and respond within **7 working days**.</li>
          <li><strong>Settlement:</strong> If a refund is approved, it will be credited back to the original bank account or card used to make the payment. The settlement typically takes **7 to 14 working days**, depending on bank clearing times.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">5. Submit a Refund Request</h2>
        <p>For refund inquiries, please email our accounting team at:</p>
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl space-y-1 text-sm border border-gray-100 dark:border-gray-800">
          <p><strong>Finance Department</strong></p>
          <p>ISKCON Sri Sri Radha Krishna Mandir</p>
          <p>Email: <a href="mailto:info@iskconbangalorekrpuram.com" className="text-blue-600 dark:text-blue-400 hover:underline">info@iskconbangalorekrpuram.com</a></p>
          <p>Phone: +91 9110729142</p>
        </div>
      </section>
    </LegalLayout>
  )
}
