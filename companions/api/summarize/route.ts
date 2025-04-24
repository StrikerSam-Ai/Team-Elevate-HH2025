// ==============================
// 1. ENV Configuration (.env.local)
// ==============================
// Place this in your root directory
// DO NOT commit this file to Git

GROQ_API_KEY=your_groq_api_key_here


// ==============================
// 2. API Route (app/api/summarize/route.ts)
// ==============================

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that summarizes user journal entries into short, meaningful summaries.',
          },
          {
            role: 'user',
            content: `Summarize this journal entry: ${text}`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const summary = response.data.choices[0].message.content;
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 });
  }
}


// ==============================
// 3. Groq Client Helper (lib/groqClient.ts)
// ==============================

export async function fetchSummary(text: string): Promise<string> {
  const response = await fetch('/api/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  const data = await response.json();
  if (data.summary) return data.summary;
  throw new Error(data.error || 'Failed to fetch summary');
}


// ==============================
// 4. Component Usage (components/SummaryButton.tsx)
// ==============================

'use client';

import { useState } from 'react';
import { fetchSummary } from '@/lib/groqClient';

interface SummaryButtonProps {
  entry: string;
}

export default function SummaryButton({ entry }: SummaryButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    try {
      const summary = await fetchSummary(entry);
      setResult(summary);
    } catch (err) {
      setResult('Error generating summary');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize Entry'}
      </button>
      {result && (
        <div className="mt-4 p-3 bg-white rounded-lg shadow">
          <strong>Summary:</strong> <p>{result}</p>
        </div>
      )}
    </div>
  );
}


// ==============================
// 5. Usage Example in Page (app/page.tsx)
// ==============================

import SummaryButton from '@/components/SummaryButton';

export default function Home() {
  const entryText = 'Today was a rollercoaster of emotions — exciting, exhausting, and a bit confusing.';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Journal</h1>
      <SummaryButton entry={entryText} />
    </main>
  );
}
