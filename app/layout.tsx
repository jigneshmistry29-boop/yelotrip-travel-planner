import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YeloTrip - A Travel Planner',
  description: 'Curated journeys, corporate MICE support, and an AI travel concierge for every story.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
