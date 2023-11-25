import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const {
      username,
      email,
      phone,
      location,
      property_type,
      price_range,
      company_id,
    } = await request.json();
    console.log("from buyer route: ");
    console.log(
      username,
      email,
      phone,
      location,
      property_type,
      price_range,
      company_id
    );

    const result = await sql`insert into buyer 
        (buyer_name, phone, email,location,property_type,price_range,company_id)
         values (${username}, ${phone}, ${email},${location},${property_type},${price_range},${company_id}) returning *;`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
