'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function CustomerCarePage() {
  const [form, setForm] = useState({
    issueType: 'General enquiry',
    name: '',
    email: '',
    phone: '',
    summary: '',
    consent: false,
  });
  const [ticketNumber, setTicketNumber] = useState('YT-TKT-2026-1000');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextTicket = `YT-TKT-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setTicketNumber(nextTicket);
    alert(`Support ticket created: ${nextTicket}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-black text-slate-900">YeloTrip</Link>
          <div className="flex gap-4 text-sm text-slate-600">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <Link href="/mice" className="hover:text-brand-600">MICE</Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Customer Care</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Interactive support & grievance ticket generator</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Need travel assistance, an itinerary clarification, or a formal grievance? Submit below and YeloTrip will coordinate your case with a ticket reference.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span>Support category</span>
              <select name="issueType" value={form.issueType} onChange={handleChange} className="w-full border border-slate-200 bg-slate-50 px-4 py-3">
                <option>General enquiry</option>
                <option>Itinerary change</option>
                <option>Travel assistance</option>
                <option>Grievance</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} className="w-full border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your full name" />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-slate-200 bg-slate-50 px-4 py-3" placeholder="you@example.com" />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span>Phone / WhatsApp</span>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-slate-200 bg-slate-50 px-4 py-3" placeholder="+91 96673 34803" />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span>Issue summary</span>
              <textarea name="summary" value={form.summary} onChange={handleChange} className="min-h-[150px] w-full border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Describe the requirement, concern, or complaint." />
            </label>

            <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1 h-4 w-4 accent-brand-600" />
              <span>I consent to YeloTrip processing this request according to the DPDP Act 2023 and relevant support procedures.</span>
            </label>

            <button type="submit" className="md:col-span-2 rounded-2xl bg-brand-600 px-6 py-3 text-base font-semibold text-white">Generate support ticket</button>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">Ticket reference</p>
            <h3 className="mt-4 text-3xl font-black">{ticketNumber}</h3>
            <p className="mt-3 text-sm text-slate-300">This reference is generated for case tracking, response follow-up, and escalation review.</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Direct contact</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>Customer Care: customer.care@yelotrip.com</li>
              <li>WhatsApp: +91 96673 34803</li>
              <li>Registered Office: C204, Samanvay Status 1, Padra Road, Atladra, Vadodara, Gujarat 390012, India</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
