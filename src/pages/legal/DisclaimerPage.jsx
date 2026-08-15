import LegalLayout from './LegalLayout'

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" icon="⚠️">
      <p className="text-gray-500 text-sm mb-4">Last Updated: August 15, 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">1. General Information</h2>
        <p>
          The information contained on this website is for general spiritual, educational, and informational 
          purposes only. The website is owned and operated by ISKCON KR Puram, Bangalore. While we endeavor to keep 
          the information up-to-date and correct, we make no representations or warranties of any kind, express 
          or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to 
          the website or the information, services, or related graphics contained on the website for any purpose. 
          Any reliance you place on such information is therefore strictly at your own risk.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">2. Spiritual Activities & Registrations</h2>
        <p>
          All registrations for temple events (including Janmashtami celebrations, IYF courses, and BhaktiVriksha 
          sessions) are conducted to assist us in organizing our resources, distributing prasadam, and preparing classroom 
          logistics. Attendance and participation in all spiritual courses, festivals, and activities are entirely voluntary.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">3. Third-Party Connections and Links</h2>
        <p>
          Through this website, you are able to link to other websites that are not under the control of ISKCON KR Puram. 
          We have no control over the nature, content, security, and availability of those sites. The inclusion of any 
          links (such as external map directions or news articles) does not necessarily imply a recommendation or endorse 
          the views expressed within them.
        </p>
        <p>
          Donations made online are redirected to secure third-party payment gateways (e.g. RazorPay). Transactions are 
          subject to the respective gateway's terms, security policies, and technical status. We are not responsible for 
          temporary gateway outages or transaction delays originating from external servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">4. Technical Status and Outages</h2>
        <p>
          Every effort is made to keep the website running smoothly. However, ISKCON KR Puram takes no responsibility 
          for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">5. Contact Information</h2>
        <p>If you have any questions about this Disclaimer, please contact us at:</p>
        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl space-y-1 text-sm border border-gray-100 dark:border-gray-800">
          <p><strong>ISKCON Sri Sri Radha Krishna Mandir</strong></p>
          <p>KR Puram, Bangalore, Karnataka, India</p>
          <p>Email: <a href="mailto:info@iskconkrpuram.org" className="text-blue-600 dark:text-blue-400 hover:underline">info@iskconkrpuram.org</a></p>
        </div>
      </section>
    </LegalLayout>
  )
}
