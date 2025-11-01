
import React, { useState, useEffect } from 'react';
import { allQuotes } from '../data/quotes';
import { Quote } from '../types';

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Select a random quote on component mount
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    setQuote(allQuotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <div className="text-center p-6 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 dark:border-black/10">
      <blockquote className="font-lora text-lg italic text-orange-950 dark:text-orange-100">
        "{quote.text}"
      </blockquote>
      <cite className="block text-right mt-3 text-sm text-orange-800 dark:text-orange-300 opacity-90">
        - {quote.source}
      </cite>
    </div>
  );
};

export default QuoteDisplay;
