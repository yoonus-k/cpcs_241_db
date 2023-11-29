import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const {
      agent_id,
      seller_id,
      buyer_id,
      property_type,
      price,
      bedrooms,
      bathrooms,
      garages,
      area,
      location,
      description,
      image,
    } = await request.json();
    console.log("from property route: ");
    console.log(
      agent_id,
      seller_id,
      buyer_id,
      property_type,
      price,
      bedrooms,
      bathrooms,
      garages,
      area,
      location,
      description,
      image
    );

    const result = await sql`insert into property 
    (agent_id,seller_id,buyer_id,property_type,
        price,bedrooms,bathrooms,garage,area_size,
        location,description,image) values 
        (${agent_id},${seller_id},${buyer_id},
            ${property_type},${price},${bedrooms},
            ${bathrooms},${garages},${area},${location},
            ${description},${image}) returning *;`;

    result.command = `insert into property
    (agent_id,seller_id,buyer_id,property_type,
        price,bedrooms,bathrooms,garage,area_size,
        location,description,image) values 
        (${agent_id},${seller_id},${buyer_id},
            ${property_type},${price},${bedrooms},
            ${bathrooms},${garages},${area},${location},
            ${description},${image}) returning *;`;

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
