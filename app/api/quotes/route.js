import prisma from "../../../lib/prisma";

export async function GET() {
  const quotes = await prisma.quote.findMany({
    take: 20,
  });

  const shuffledQuotes = quotes.sort(() => 0.5 - Math.random());

  return new Response(JSON.stringify(shuffledQuotes), {
    headers: { "Content-Type": "application/json" },
  });
}
