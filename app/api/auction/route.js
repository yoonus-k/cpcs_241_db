import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    // the data comming from auction object
    // property_id: "",
    // starting_bid: "",
    // auction_start_date: null,
    // auction_end_date: null,
    // highest_bid: "",
    // winning_bid: "",
    // buyer_id: "",
    const {
      property_id,
      starting_bid,
      auction_start_date,
      auction_end_date,
      highest_bid,
    } = await request.json();
    console.log(
      property_id,
      starting_bid,
      auction_start_date,
      auction_end_date,
      highest_bid
    );

    // make new payment
    const result =
      await sql`insert into auction (property_id,starting_bid,auction_start_date,auction_end_date,highest_bid) values (${property_id},${starting_bid},${auction_start_date},${auction_end_date},${highest_bid}) returning *`;

    console.log(result);

    // add the auction to the property
    const result2 =
      await sql`update property set auction_id=${result.rows[0].auction_id} where property_id=${property_id} returning *`;
    console.log(result2);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// route to get all payments GET
export async function GET(request) {
  try {
    // select all auctions
    const result = await sql`select * from auction`;
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

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
