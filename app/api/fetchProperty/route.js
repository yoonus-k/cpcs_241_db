import { sql } from "@vercel/postgres";

// get all sellers
export async function POST(req) {
  try {
    const result = await sql`select * from property ;`;

    result.command = "select * from property ;";

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
