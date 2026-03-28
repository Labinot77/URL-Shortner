// app/[url]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ url: string }> },
) {
  // Await the params (required in Next.js 15+) I didnt know
  const { url: shortCode } = await params;

  const record = await prisma.url.findUnique({
    where: { shortCode },
  });

  if (!record) {
    return new NextResponse("URL not found", { status: 404 });
  }

  let destination = record.originalUrl;
  if (!/^https?:\/\//i.test(destination)) {
    destination = `https://${destination}`;
  }

  return NextResponse.redirect(destination);
}
