// get all users from the database
import { sql } from "@vercel/postgres";
export async function POST(request) {
  try {
    // get the email from the request body
    const { email } = await request.json();

    const result =
      await sql`select seller_id,seller_name,email,'seller' as source from seller where email = ${email} 
    UNION ALL
    select buyer_id,buyer_name,email,'buyer' as source from buyer where email = ${email}
    UNION ALL
    select agent_id,agent_name,email,'agent' as source from agent where email = ${email}
    ;`;
    console.log("from users api route:");
    console.log(result);

    // check if the user exists in the database
    if (result.rows.length > 0) {
      return new Response(JSON.stringify(result), { status: 200 });
    } else {
      return new Response(JSON.stringify("user not found"), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
