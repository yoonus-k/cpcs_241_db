import { sql } from "@vercel/postgres";

// route to get all payments GET
export async function GET(request) {
  try {
    // select all auctions
    const result = await sql`select * from auction`;

    result.command = `select * from auction`;
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { property_id, winning_bid, highest_bid } = await request.json();
    console.log(property_id, winning_bid, highest_bid);

    // make new payment
    const result =
      await sql`update auction set winning_bid=${winning_bid},highest_bid=${highest_bid} where property_id=${property_id} returning *`;

    result.command = `update auction set winning_bid=${winning_bid},highest_bid=${highest_bid} where property_id=${property_id} returning *`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
