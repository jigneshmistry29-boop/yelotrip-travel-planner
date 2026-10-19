# YeloTrip - A Travel Planner

A production-minded travel concierge built with Next.js, Tailwind CSS, Framer Motion, and a Gemini-based AI chat shell.

## Features
- Mobile-first travel planner landing page
- Corporate MICE desk with GST model selection
- Customer care and grievance ticket generator
- DPDP consent gating with unchecked defaults
- Text zoom and speech synthesis accessibility tools
- AI concierge route with prompt guardrails
- Multilingual locale selector covering Indian languages

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create a `.env.local` file for Gemini integration if you want live AI responses:

```bash
GOOGLE_GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3-flash-preview
```

## Notes

The project intentionally avoids binding price confirmations and booking commitments without specialist verification.
