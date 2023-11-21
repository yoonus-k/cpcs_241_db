import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const { username, email, phone, commission_rate } = await request.json();
    console.log("from agent route: ");
    console.log(username, email, phone, commission_rate);

    const result =
      await sql`insert into agent (agent_name, phone, email,commission_rate) values (${username}, ${phone}, ${email},${commission_rate}) returning *;`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

// get all sellers
export async function GET(request) {
  try {
    const email = request.headers.get("email");
    const result = await sql`select * from agent where email = ${email};`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
