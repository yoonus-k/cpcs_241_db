import { sql } from "@vercel/postgres";
// route to get all payments GET
export async function POST(request) {
  try {
    // get all payments with the property details and the buyer details
    const result = await sql`select * from payment p 
    inner join property pr on p.property_id = pr.property_id 
    inner join buyer b on pr.buyer_id = b.buyer_id`;
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
