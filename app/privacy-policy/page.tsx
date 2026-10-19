import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-black text-slate-900">YeloTrip</Link>
          <Link href="/customer-care" className="text-sm text-slate-600 hover:text-brand-600">Customer Care</Link>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">DPDP Act 2023 compliance and data handling</h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p>YeloTrip - A Travel Planner processes personal information solely for travel planning, support coordination, and statutory compliance. We collect only the data necessary to serve customer enquiries, prepare travel proposals, and address grievances.</p>
          <p>Personal information may be collected through forms, support requests, and AI-assisted itinerary discussions. We do not pre-tick consent boxes. Consent is obtained only when users explicitly choose to provide their information and affirmative approval.</p>
          <p>Under the Digital Personal Data Protection Act, 2023 (Sections 8 and 13), user data is processed with transparency, security, and the right to redressal. Requests for correction, withdrawal, or grievance handling can be directed to the nominated officer.</p>
          <p><strong>Designated Grievance & DPDP Officer:</strong> Jignesh Mistry<br />Email: jignesh.mistry@yelotrip.com</p>
          <p><strong>Customer Care:</strong> customer.care@yelotrip.com<br />Phone / WhatsApp: +91 96673 34803</p>
          <p><strong>Registered Office:</strong> C204, Samanvay Status 1, Padra Road, Atladra, Vadodara, Gujarat 390012, India</p>
        </div>
      </article>
    </main>
  );
}
