import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    // the payement body :
    // property_id: propertyId,
    // buyer_id: 0,
    // payment_method: "card",
    // amount: 0,
    // payment_status: "pending",
    // get the payment details from the request body
    const { property_id, buyer_id, payment_method, amount, payment_status } =
      await request.json();
    // make new payment
    const result =
      await sql`insert into payment (property_id,payment_method,amount,payment_status) values (${property_id},${payment_method},${amount},${payment_status}) returning *`;

    // update the property status to sold
    await sql`update property set buyer_id = ${buyer_id} where property_id = ${property_id}`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
