"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShortenUrlCard } from "./components/shortenUrlCard";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, ArrowRight } from "lucide-react";


// ✅ Validation schema
const formSchema = z.object({
  url: z.string().url("Enter a valid URL"),
});

export default function Home() {
  const [result, setResult] = useState<{
    originalUrl: string;
    shortUrl: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: { url: string }) => {
    try {
      setIsLoading(true);

      const data = await apiPost<{ shortUrl: string }>(
        "/api/shorten",
        { url: values.url }
      );

      // ✅ store BOTH values together
      setResult({
        originalUrl: values.url,
        shortUrl: data.shortUrl,
      });

      form.reset(); // clears input
    } catch (err: any) {
      form.setError("url", {
        message: err.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7ff] via-[#f4fbff] to-white flex items-center justify-center p-6">
      <main className="w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-2">
          Shorten a <span className="text-cyan-600">link</span>
        </h1>

        <p className="text-slate-500 text-sm text-center mb-6">
          Paste a URL to get a clean short link.
        </p>

        {/* ✅ SHADCN FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500" />
                    <FormControl>
                      <Input
                        placeholder="https://example.com/long-url"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Shortening..." : "Shorten"}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </form>
        </Form>

        {/* ✅ CARD APPEARS AFTER SUBMIT */}
        {result && (
          <ShortenUrlCard
            id="1"
            originalUrl={result.originalUrl}
            shortUrl={result.shortUrl}
          />
        )}
      </main>
    </div>
  );
}