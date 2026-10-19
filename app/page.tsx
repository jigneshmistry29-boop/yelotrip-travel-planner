import { CardTravel, Compass, DollarSign, MapPinned, MessageSquareText, ShieldCheck, Sparkles, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

const languages = [
  'English', 'हिन्दी', 'ગુજરાતી', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'മലയാളം', 'ਪੰਜਾਬੀ', 'অসমীয়া', 'ଓଡ଼ିଆ', 'کشمیر', 'कोंकणी', 'संस्कृत', 'नेपाली', 'اردو',
];

const translations: Record<string, Record<string, string>> = {
  English: {
    heroTag: 'All Trips End in a Story',
    headline: 'Every Journey Begins with a Dream',
    blurb: 'Bespoke routes, trusted on-ground support, and an AI travel specialist that turns ideas into journeys.',
    ctaPrimary: 'Plan My Trip',
    ctaSecondary: 'Talk to an Expert',
    destination: 'Destination',
    travelDates: 'Travel dates',
    travelers: 'Travelers',
    budget: 'Budget',
    style: 'Travel style',
    interest: 'Priority interests',
    privacy: 'I consent to YeloTrip processing my travel enquiry as per the DPDP Act 2023.',
    submit: 'Create my plan',
    concierge: 'YeloTrip AI Concierge',
    corporate: 'Corporate & MICE Desk',
    care: 'Customer Care',
  },
  हिन्दी: {
    heroTag: 'हर यात्रा की कहानी एक मुकाम तक पहुँचती है',
    headline: 'हर सफर एक सपना से शुरू होता है',
    blurb: 'कस्टम ट्रिप, भरोसेमंद स्थानीय सहायता और एआई ट्रैवल विशेषज्ञ जो विचारों को यात्राओं में बदलते हैं।',
    ctaPrimary: 'यात्रा योजना बनाएं',
    ctaSecondary: 'विशेषज्ञ से बात करें',
    destination: 'गंतव्य',
    travelDates: 'यात्रा की तिथियाँ',
    travelers: 'यात्री',
    budget: 'बजट',
    style: 'यात्रा शैली',
    interest: 'प्राथमिक रुचियाँ',
    privacy: 'मैं YeloTrip को DPDP Act 2023 के अनुसार मेरे ट्रैवल इनक्वायरी को प्रोसेस करने की सहमति देता/देती हूँ।',
    submit: 'मेरी योजना बनाएं',
    concierge: 'YeloTrip AI कंसियर्ज',
    corporate: 'कॉरपोरेट & MICE डेस्क',
    care: 'कस्टमर केयर',
  },
  ગુજરાતી: {
    heroTag: 'દર પ્રવાસનો અંત એક વાર્તામાં થાય છે',
    headline: 'દર યાત્રા એક સ્વપ્નથી શરૂ થાય છે',
    blurb: 'બેસપોક રુટ્સ, વિશ્વસનીય ઓન-ગ્રાઉન્ડ સપોર્ટ અને એક AI ટ્રાવેલ સ્પેશલિસ્ટ જે વિચારને યાત્રામાં ફેરવે છે.',
    ctaPrimary: 'મારી ટ્રિપનું આયોજન કરો',
    ctaSecondary: 'વિશેષજ્ઞ સાથે વાત કરો',
    destination: 'ગંતવ્ય',
    travelDates: 'યાત્રાની તારીખો',
    travelers: 'યાત્રિક',
    budget: 'બજેટ',
    style: 'યાત્રાની શૈલી',
    interest: 'પ્રાથમિક રુચિઓ',
    privacy: 'હું YeloTrip ને DPDP Act 2023 મુજબ મારી ટ્રાવેલ ઇનક્વાઇરી પ્રક્રિયા કરવા માટે સંમત છું.',
    submit: 'મારી યોજના બનાવો',
    concierge: 'YeloTrip AI કન્સિયર્જ',
    corporate: 'કોર્પોરેટ & MICE ડેસ્ક',
    care: 'કસ્ટમર કેयर',
  },
};

const tripIdeas = [
  { title: 'Culture Trails', destination: 'Jaipur • Udaipur', tag: 'Heritage', icon: MapPinned },
  { title: 'Wild Escapes', destination: 'Coorg • Wayanad', tag: 'Nature', icon: Compass },
  { title: 'Family Retreats', destination: 'Goa • Kerala', tag: 'Relax', icon: Users },
];

const servicePillars = [
  { title: 'Curated Itineraries', desc: 'Seamless planning with local expertise and smart pacing.', icon: Compass },
  { title: 'Travel Assurance', desc: 'Transparent guidance, vetted support, and stress-free coordination.', icon: ShieldCheck },
  { title: 'Corporate Travel', desc: 'MICE and executive programmes for teams and events.', icon: CardTravel },
  { title: 'AI Concierge', desc: 'Instant assistance with destination suggestions and planning help.', icon: MessageSquareText },
];

const appLinks = [
  { label: 'Home', href: '/' },
  { label: 'Corporate MICE', href: '/mice' },
  { label: 'Customer Care', href: '/customer-care' },
  { label: 'Grievance Policy', href: '/grievance-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

export default function HomePage() {
  const [lang, setLang] = useState('English');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Namaste! I am the YeloTrip Travel Specialist Team. Tell me your dream destination and I will help shape a practical plan.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tripForm, setTripForm] = useState({
    destination: '',
    dates: '',
    travelers: '2',
    budget: '₹80k - ₹1.5L',
    style: 'Balanced',
    interest: 'Culture + food',
    consent: false,
  });
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const t = translations[lang] || translations.English;

  const miniSummary = useMemo(() => {
    return `Trip brief: ${tripForm.destination || 'Your next destination'} • ${tripForm.travelers || '2'} travelers • ${tripForm.budget || 'Flexible budget'}`;
  }, [tripForm]);

  const speak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(`${t.headline}. ${t.blurb}`);
    utterance.lang = lang === 'English' ? 'en-IN' : 'hi-IN';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language: lang }),
      });
      const data = await response.json();
      const aiText = data.text || 'I can help you shape a tailored travel plan. Share dates, travelers, and budget, and our specialist team can guide the next step.';
      setMessages((prev) => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'I am currently in offline guidance mode. Please share your destination, travel dates, and budget for a curated draft.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTripSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Thank you! Your trip enquiry has been recorded. The YeloTrip Travel Specialist Team will review and respond within 1 working day.');
  };

  return (
    <main style={{ fontSize: `${zoomLevel}%` }} className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">Y</div>
            <div>
              <p className="text-lg font-bold text-slate-900">YeloTrip</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">A Travel Planner</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            {appLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-brand-600">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setZoomLevel((level) => Math.min(130, level + 10))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium">A+</button>
            <button onClick={speak} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium">🔊</button>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              {languages.map((language) => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <section className="hero-pattern relative overflow-hidden bg-mesh">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="z-10">
            <div className="mb-6 inline-flex rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              {t.heroTag}
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t.headline}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              {t.blurb}
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#planner" className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-brand-700">{t.ctaPrimary}</a>
              <button onClick={() => setChatOpen(true)} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-brand-200 hover:text-brand-700">{t.ctaSecondary}</button>
            </div>

            <div className="mt-10 grid max-w-lg gap-4 sm:grid-cols-3">
              {[
                ['2500+', 'Trips planned'],
                ['96%', 'Repeat travellers'],
                ['24/7', 'Support'],
              ].map(([value, label]) => (
                <div key={label} className="glass rounded-2xl border border-white/70 p-4 shadow-soft">
                  <div className="text-2xl font-black text-brand-700">{value}</div>
                  <div className="mt-1 text-sm text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass relative rounded-[2rem] border border-white/60 p-4 shadow-soft sm:p-6">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Featured route</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">Royal Rajasthan</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-100 via-white to-amber-50 p-6">
                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>12 days</span>
                    <span>From ₹49,999</span>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between text-sm text-slate-200">
                      <span>Jaipur</span>
                      <span>3 nights</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-200">
                      <span>Jodhpur</span>
                      <span>2 nights</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-200">
                      <span>Udaipur</span>
                      <span>4 nights</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Includes</span>
                  <span>Vetted stays</span>
                </div>
                <div className="mt-4 flex gap-3">
                  {['Private transfers', 'Guided heritage walks', 'Airport support'].map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Travel design</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Built around your pace and purpose</h2>
          </div>
          <Link href="/mice" className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-200 hover:text-brand-700 md:inline-flex">Explore MICE desk</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {servicePillars.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} whileHover={{ y: -4 }} className="glass rounded-[1.75rem] border border-slate-200 p-6 shadow-soft">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="planner" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Plan my trip</p>
            <h3 className="mt-2 text-3xl font-black text-slate-900">Tell us the trip you dream about</h3>
            <form onSubmit={handleTripSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>{t.destination}</span>
                <input value={tripForm.destination} onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-brand-500" placeholder="Goa, Bali, Kashmir..." />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>{t.travelDates}</span>
                <input value={tripForm.dates} onChange={(e) => setTripForm({ ...tripForm, dates: e.target.value })} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 transition focus:border-brand-500" placeholder="14-19 Nov 2026" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>{t.travelers}</span>
                <select value={tripForm.travelers} onChange={(e) => setTripForm({ ...tripForm, travelers: e.target.value })} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500">
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>{t.budget}</span>
                <select value={tripForm.budget} onChange={(e) => setTripForm({ ...tripForm, budget: e.target.value })} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500">
                  <option>₹40k - ₹80k</option>
                  <option>₹80k - ₹1.5L</option>
                  <option>₹1.5L - ₹3L</option>
                  <option>₹3L+</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                <span>{t.style}</span>
                <input value={tripForm.style} onChange={(e) => setTripForm({ ...tripForm, style: e.target.value })} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500" placeholder="Adventure, slow travel, wellness, beaches..." />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                <span>{t.interest}</span>
                <input value={tripForm.interest} onChange={(e) => setTripForm({ ...tripForm, interest: e.target.value })} className="w-full border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-brand-500" placeholder="Culture, food, nature, photography, family-friendly..." />
              </label>
              <label className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <input checked={tripForm.consent} onChange={(e) => setTripForm({ ...tripForm, consent: e.target.checked })} type="checkbox" className="mt-1 h-4 w-4 accent-brand-600" />
                <span>{t.privacy}</span>
              </label>
              <button type="submit" className="md:col-span-2 rounded-2xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-soft hover:bg-brand-700">{t.submit}</button>
            </form>
          </div>

          <div className="rounded-[1.5rem] bg-slate-900 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">Trip snapshot</p>
            <h4 className="mt-3 text-2xl font-black">{miniSummary}</h4>
            <div className="mt-8 space-y-4">
              {tripIdeas.map((idea) => {
                const Icon = idea.icon;
                return (
                  <div key={idea.title} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/20 text-brand-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{idea.title}</p>
                        <p className="text-sm text-slate-300">{idea.destination}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-brand-100">{idea.tag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { title: 'Bespoke planning', text: 'Every itinerary is shaped around your season, pace, and interests.' },
            { title: 'On-ground support', text: 'Destination planning, local transfers, and day-of coordination.' },
            { title: 'Compliant professionalism', text: 'Transparent processes with statutory disclosure and consent-friendly practises.' },
          ].map((item) => (
            <div key={item.title} className="glass rounded-[1.5rem] border border-slate-200 p-6 shadow-soft">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-brand-100 bg-gradient-to-r from-brand-600 to-brand-500 p-7 text-white shadow-soft">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Need a custom route?</p>
              <h3 className="mt-3 text-3xl font-black">Let YeloTrip shape the next chapter of your journey.</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/mice" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-700">Corporate & MICE</Link>
              <Link href="/customer-care" className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white">Support</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-50">
        {chatOpen ? (
          <div className="w-[360px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
              <div>
                <p className="text-sm font-semibold">{t.concierge}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Guardrails enabled</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-lg">×</button>
            </div>

            <div ref={chatBoxRef} className="flex max-h-[360px] flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.role === 'assistant' ? 'bg-white text-slate-700' : 'ml-auto bg-brand-600 text-white'}`}>
                  {message.text}
                </div>
              ))}
              {isLoading && <div className="max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-slate-700">Preparing your travel response...</div>}
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about destinations, themes, or travel plans..." className="flex-1 border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-400" />
                <button onClick={handleChatSubmit} className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Send</button>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-soft">
            <MessageSquareText className="h-4 w-4" />
            {t.concierge}
          </button>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr_1.2fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold text-white">Y</div>
              <div>
                <p className="text-lg font-bold text-slate-900">YeloTrip</p>
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">A Travel Planner</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm leading-6">{t.heroTag} — curated journeys that balance excitement, trust, and the realities of modern travel planning.</p>
          </div>

          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-900">Company</p>
            <ul className="mt-4 space-y-3">
              {appLinks.slice(0, 3).map((item) => (
                <li key={item.href}><Link href={item.href} className="hover:text-brand-600">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-900">Compliance</p>
            <ul className="mt-4 space-y-3">
              <li><Link href="/grievance-policy" className="hover:text-brand-600">Grievance Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-600">Privacy Policy</Link></li>
              <li><Link href="/customer-care" className="hover:text-brand-600">Customer Care</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-slate-900">Contact</p>
            <ul className="mt-4 space-y-3">
              <li>Registered Office: C204, Samanvay Status 1, Padra Road, Atladra, Vadodara, Gujarat 390012, India</li>
              <li>Udyam Registration: UDYAM-GJ-24-0253399</li>
              <li>Customer Care: customer.care@yelotrip.com</li>
              <li>WhatsApp: +91 96673 34803</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
