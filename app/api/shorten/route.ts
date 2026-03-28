import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
      });
    }

    const shortCode = nanoid(6);

    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL
        : process.env.NEXT_PRIVATE_BASE_URL;
    return Response.json({
      shortUrl: `${baseUrl}/${newUrl.shortCode}`,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}