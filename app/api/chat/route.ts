import { NextRequest, NextResponse } from 'next/server';

const fallbackReply = (language: string, message: string) => {
  const lower = message.toLowerCase();
  if (lower.includes('price') || lower.includes('cost') || lower.includes('booking')) {
    return 'I can help draft a travel brief, shortlist destinations, and structure a proposal, but I cannot confirm live pricing or bind a booking without final specialist verification from the YeloTrip Travel Specialist Team.';
  }

  return `I am the YeloTrip Travel Specialist Team. Based on your message — "${message}" — I can help shape a travel concept, destination shortlist, or itinerary direction in ${language}. Please share dates, travelers, and budget for a more specific plan.`;
};

export async function POST(request: NextRequest) {
  try {
    const { message, language } = await request.json();
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ text: fallbackReply(language || 'English', message || 'I need travel assistance.') });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{
              text: `You are the YeloTrip Travel Specialist Team. Respond in ${language || 'English'} and keep the tone helpful, clear, and professional. Do not confirm live prices, final bookings, or binding reservations without expert verification. Suggest ideas, itinerary structure, and destination options. User request: ${message}`,
            }],
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ text: fallbackReply(language || 'English', message) });
    }

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || fallbackReply(language || 'English', message);
    return NextResponse.json({ text: answer });
  } catch (error) {
    return NextResponse.json({ text: 'I am in offline specialist mode. Share your destination, dates, and travel style and I can help shape a practical first draft.' });
  }
}
