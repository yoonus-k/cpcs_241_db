import { sql } from "@vercel/postgres";

export async function POST(request, { params }) {
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
      winning_bid,
    } = await request.json();
    console.log(
      property_id,
      starting_bid,
      auction_start_date,
      auction_end_date,
      highest_bid,
      winning_bid
    );

    // update the auction and put the buyer_id to winning_bid
    const result =
      await sql`update auction set buyer_id=${winning_bid} where auction_id=${params.id} returning *`;

    // make new payment
    const result_2 =
      await sql`insert into payment (property_id,amount, payment_method , payment_status) values (${property_id},${highest_bid},'bidding','Pending') returning *`;

    // update the property status to sold
    const result_3 = await sql`UPDATE property
    SET buyer_id = COALESCE((
        SELECT buyer_id FROM buyer WHERE buyer_id = ${winning_bid}
      ), NULL),
      buyer_seller_id = COALESCE((
        SELECT seller_id FROM seller WHERE seller_id = ${winning_bid}
      ), NULL)
    WHERE property_id = ${property_id}
    RETURNING *;`;

    return new Response(JSON.stringify(result, result_2, result_3), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// route to get all auctions
export async function GET(request, { params }) {
  try {
    // select all auctions
    const result =
      await sql`select * from auction where property_id=${params.id}`;
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
