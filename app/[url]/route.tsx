// app/[url]/route.ts
import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { url: string } }
) {
  const shortCode = params.url

  const record = await prisma.url.findUnique({
    where: { shortCode },
  })

  if (!record) {
    return new Response("URL not found", { status: 404 })
  }

  // Make sure URL has http or https
  let destination = record.originalUrl
  if (!/^https?:\/\//i.test(destination)) {
    destination = `https://${destination}`
  }

  // Redirect
  return Response.redirect(destination, 302)
}