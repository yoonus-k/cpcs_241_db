// get all users from the database
import { sql } from "@vercel/postgres";
export async function POST(request, { params }) {
  try {
    // get the email from the request body

    const result =
      await sql`select seller_id,seller_name,email, phone,'seller' as source from seller where seller_id = ${params.id} 
    UNION ALL
    select buyer_id,buyer_name,email,phone,'buyer' as source from buyer where buyer_id = ${params.id}
    UNION ALL
    select agent_id,agent_name,email,phone,'agent' as source from agent where agent_id = ${params.id}
    ;`;
    console.log("from users[id] api route:");
    console.log(result);
    result.command = `select seller_id,seller_name,email, phone,'seller' as source from seller where seller_id = ${params.id} 
    UNION ALL
    select buyer_id,buyer_name,email,phone,'buyer' as source from buyer where buyer_id = ${params.id}
    UNION ALL
    select agent_id,agent_name,email,phone,'agent' as source from agent where agent_id = ${params.id}
    ;`;

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
