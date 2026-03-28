"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiPost } from "@/lib/api";
import { Link, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
   const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    try {
      setIsLoading(true);
      const data = await apiPost<{ shortUrl: string }>("/api/shorten", { url });
      setShortUrl(data.shortUrl);
      setUrl("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7ff] via-[#f4fbff] to-white text-slate-900 flex items-center justify-center p-6">
      <main className="w-full max-w-lg">
        <h1 className="text-3xl font-semibold tracking-tight text-center mb-2">
          Shorten a <span className="text-cyan-600">link</span>
        </h1>
        <p className="text-slate-500 text-sm text-center mb-6">
          Paste a URL to get a clean short link.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Link className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
            <Input
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="https://example.com/long-url"
              className="w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
          <Button
            type="submit"
            className="flex h-10 items-center gap-1.5 rounded-md bg-cyan-600 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>

        {error && <p className="text-rose-600 text-sm mb-2">{error}</p>}

        {shortUrl ? (
          <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
            <p className="mb-1 font-semibold">Your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="break-all font-medium underline hover:text-cyan-900"
            >
              {shortUrl}
            </a>
          </div>
        ) : null}
      </main>
    </div>
  );
}
