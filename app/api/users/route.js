import db from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await db.connectToDB();
    await db.disConnectDB();
    return new Response(JSON.stringify({ name: "John doe" }), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all users", { status: 500 });
  }
};
