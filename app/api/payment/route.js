import { sql } from "@vercel/postgres";
// route to get all payments GET
export async function POST(request) {
  try {
    // get all payments with the property details and the buyer details
    const result = await sql`SELECT *
    FROM payment p
    INNER JOIN property pr ON p.property_id = pr.property_id
    LEFT JOIN buyer b ON pr.buyer_id = b.buyer_id
    LEFT JOIN seller s ON pr.buyer_seller_id = s.seller_id;`;
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
