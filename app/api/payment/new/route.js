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
    console.log(property_id, buyer_id, payment_method, amount, payment_status);
    // convert the property_id to integer

    // make new payment
    const result =
      await sql`insert into payment (property_id,payment_method,amount,payment_status) values (${property_id},${payment_method},${amount},${payment_status}) returning *`;

    // update the property status to sold
    const result2 = await sql`UPDATE property
      SET buyer_id = CASE
          WHEN EXISTS (SELECT buyer_id FROM buyer WHERE buyer_id = ${buyer_id}) THEN ${buyer_id}
          ELSE NULL
        END,
        buyer_seller_id = CASE
          WHEN EXISTS (SELECT seller_id FROM seller WHERE seller_id = ${buyer_id}) THEN ${buyer_id}
          ELSE NULL
        END
      WHERE property_id = ${property_id} returning *;`;

    return new Response(JSON.stringify(result, result2), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
