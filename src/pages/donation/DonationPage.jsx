import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export default function DonationPage() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = window.location.hostname
    QRCode.toCanvas(canvasRef.current, `http://${host}:3000/donation/thank-you`, {
      width: 220,
      margin: 2,
      color: { dark: '#15803d', light: '#ffffff' },
    })
  }, [])

  return (
    <section className="min-h-[60vh] py-16 bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Support Our Services</h1>
        <div className="w-20 h-1 mx-auto mt-4 mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--theme-cta-from), var(--theme-cta-to))' }}></div>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Your contribution helps us serve prasadam, organize festivals, and share Krishna consciousness.
          Every donation at ISKCON KR Puram, Bangalore is deeply appreciated.
        </p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center p-6 md:p-10 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="bg-green-50 rounded-2xl p-6">
                <canvas ref={canvasRef} className="rounded-xl"></canvas>
              </div>
              <p className="text-sm text-gray-500 mt-3">Scan to send donation</p>
              <p className="text-xs text-gray-400">Receive a personal thank-you message 🙏</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10 md:w-1/2">
              <div className="text-center space-y-3">
                <p className="text-xl font-bold text-gray-800">Bank Details</p>
                <div className="text-sm text-gray-600 space-y-1.5">
                  <p><span className="font-semibold">Bank:</span> State Bank of India</p>
                  <p><span className="font-semibold">Account:</span> ISKCON KR Puram</p>
                  <p><span className="font-semibold">A/C No:</span> 1234567890123456</p>
                  <p><span className="font-semibold">IFSC:</span> SBIN0001234</p>
                  <p><span className="font-semibold">UPI:</span> iskconkrpuram@upi</p>
                </div>
                <p className="text-xs text-gray-400 pt-2">Hare Krishna. Thank you!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}