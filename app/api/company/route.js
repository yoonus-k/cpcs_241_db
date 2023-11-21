import { sql } from "@vercel/postgres";

export async function GET(request) {
  try {
    const result = await sql`select * from company;`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
