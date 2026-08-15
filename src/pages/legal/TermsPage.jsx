import LegalLayout from './LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" icon="📝">
      <p className="text-gray-500 text-sm mb-4">Last Updated: August 15, 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or using the ISKCON KR Puram website ("Service"), you agree to be bound by these 
          Terms & Conditions, our Privacy Policy, and any additional guidelines posted on this site. If you 
          do not agree to these terms, please do not use our website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">2. Modification of Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to update, modify, or replace any part of these 
          Terms & Conditions by posting updates on our website. It is your responsibility to check this page 
          periodically for changes. Your continued use of the website following any changes constitutes acceptance of those updates.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">3. Acceptable Use</h2>
        <p>You agree to use this website solely for personal, non-commercial, and lawful purposes. Specifically, you agree not to:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service or content on this website without our express written permission.</li>
          <li>Submit false, misleading, or fraudulent information during devotee, IYF, or BhaktiVriksha registrations.</li>
          <li>Transmit any worms, viruses, malware, or any code of a destructive nature.</li>
          <li>Attempt to gain unauthorized access to our web servers, database connections, or administration dashboards.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">4. Intellectual Property</h2>
        <p>
          All content, structures, logos, designs, text, scripts, and media on this website are the intellectual property 
          of ISKCON KR Puram or its content suppliers and are protected by Indian and international copyright, trademark, 
          and intellectual property laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">5. Governing Law and Jurisdiction</h2>
        <p>
          These Terms & Conditions and any separate agreements shall be governed by and construed in accordance with 
          the laws of **India**. Any disputes arising in connection with these terms shall be subject to the exclusive 
          jurisdiction of the courts of **Bangalore, Karnataka**.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">6. Disclaimer of Warranties; Limitation of Liability</h2>
        <p>
          The service and all information, content, and materials on the website are provided on an "as is" and "as available" 
          basis unless otherwise specified in writing. We do not warrant that your use of our service will be uninterrupted, 
          timely, secure, or error-free.
        </p>
        <p>
          In no case shall ISKCON KR Puram, our committee members, volunteers, or affiliates be liable for any injury, 
          loss, claim, or any direct, indirect, incidental, or consequential damages of any kind arising from your use of 
          the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">7. Contact Information</h2>
        <p>Questions about the Terms & Conditions should be sent to us at:</p>
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl space-y-1 text-sm border border-gray-100 dark:border-gray-800">
          <p><strong>ISKCON Sri Sri Radha Krishna Mandir</strong></p>
          <p>KR Puram, Bangalore, Karnataka, India</p>
          <p>Email: <a href="mailto:info@iskconkrpuram.org" className="text-blue-600 dark:text-blue-400 hover:underline">info@iskconkrpuram.org</a></p>
        </div>
      </section>
    </LegalLayout>
  )
}
