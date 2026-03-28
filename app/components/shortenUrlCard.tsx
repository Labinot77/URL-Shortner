"use client";

import { motion } from "framer-motion";

interface CardProps {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

export function ShortenUrlCard({ originalUrl, shortUrl }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm mt-4"
    >
      <p className="text-sm text-slate-500 mb-1">
        Short URL:{' '}
        <a
          href={shortUrl}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-600 font-medium underline"
        >
          {shortUrl}
        </a>
      </p>
    </motion.div>
  );
}