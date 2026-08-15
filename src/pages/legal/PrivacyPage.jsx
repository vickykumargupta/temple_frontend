import LegalLayout from './LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" icon="🔒">
      <p className="text-gray-500 text-sm mb-4">Last Updated: August 15, 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">1. Introduction</h2>
        <p>
          Welcome to ISKCON KR Puram, Bangalore ("we", "our", "us"). We value your privacy and are 
          committed to protecting your personal data. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website, register for our 
          programs, or make a donation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">2. Information We Collect</h2>
        <p>We may collect personal information that you voluntarily provide to us when you:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Register for the Janmashtami Celebrations.</li>
          <li>Join the ISKCON Youth Forum (IYF).</li>
          <li>Enroll in the BhaktiVriksha family study circles.</li>
          <li>Make a voluntary donation or request receipt documentation.</li>
          <li>Contact us with inquiries or submit feedback forms.</li>
        </ul>
        <p>This information may include your name, email address, phone number, residential address, family member details, gender, age, company/college names, and other registration interests.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">3. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong>Program Management:</strong> To organize and plan our temple programs, coordinate seating/feast arrangements, and assign classes.</li>
          <li><strong>Communications:</strong> To send updates about temple festivals, emergency alerts, newsletters, and devotional content.</li>
          <li><strong>Donation Processing:</strong> To manage financial transactions, send thank-you notes, and issue legal donation receipts.</li>
          <li><strong>Legal Compliance:</strong> To satisfy tax laws in India (such as issuing 80G tax exemption certificates, where applicable).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">4. Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share data only with 
          trusted service providers who assist us in operating our website and processing payments (e.g., RazorPay, bank gateways), 
          provided they agree to keep this information confidential and secure in accordance with their respective privacy policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">5. Cookies and Analytics</h2>
        <p>
          We may use cookies and analytics tools (like Google Analytics) to track non-personal navigation patterns 
          (such as browser type, pages visited, and time spent). This helps us improve our website experience. You can disable 
          cookies in your browser settings if you wish.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">6. Your Rights</h2>
        <p>
          You have the right to request details of the personal information we hold about you, request corrections 
          to outdated details, or request that your records be deleted from our communications database (subject to legal 
          financial retention requirements).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">7. Contact Us</h2>
        <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl space-y-1 text-sm border border-gray-100 dark:border-gray-800">
          <p><strong>ISKCON Sri Sri Radha Krishna Mandir</strong></p>
          <p>KR Puram, Bangalore, Karnataka, India</p>
          <p>Email: <a href="mailto:info@iskconbangalorekrpuram.com" className="text-blue-600 dark:text-blue-400 hover:underline">info@iskconbangalorekrpuram.com</a></p>
          <p>Phone: +91 9110729142</p>
        </div>
      </section>
    </LegalLayout>
  )
}
