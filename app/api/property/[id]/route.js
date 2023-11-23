import { sql } from "@vercel/postgres";

// get all sellers
export async function GET(req, { params }) {
  try {
    const result =
      await sql`select * from property where property_id = ${params.id};`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
