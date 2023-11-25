import { sql } from "@vercel/postgres";

// get all sellers
export async function POST(request) {
  try {
    const email = request.headers.get("email");
    const result = await sql`select * from seller where email = ${email};`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
