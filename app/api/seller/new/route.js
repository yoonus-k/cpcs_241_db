import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const { username, email, phone, company_id } = await request.json();
    console.log("from seller route: ");
    console.log(username, email, phone, company_id);

    const result =
      await sql`insert into seller (seller_name, phone, email,company_id) values (${username}, ${phone}, ${email},${company_id}) returning *;`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
