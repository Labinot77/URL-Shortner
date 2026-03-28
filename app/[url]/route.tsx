// app/[url]/route.ts
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: { url: string } }
) {
  const shortCode = context.params.url

  const record = await prisma.url.findUnique({
    where: { shortCode },
  })

  if (!record) {
    return new NextResponse("URL not found", { status: 404 })
  }

  // Ensure URL has http or https
  let destination = record.originalUrl
  if (!/^https?:\/\//i.test(destination)) {
    destination = `https://${destination}`
  }

  // Redirect
  return NextResponse.redirect(destination)
}