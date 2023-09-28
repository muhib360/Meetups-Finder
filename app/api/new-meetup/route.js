import { MongoClient } from "mongodb";

export async function POST(req) {
  const data = await req.json();

  const client = await MongoClient.connect(
    "mongodb+srv://silentassasin99heasshots:dAYmykGfInFM6JVC@cluster0.ftnjneb.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  await meetupCollection.insertOne(data);

  return new Response(JSON.stringify({ message: "meetup inserted!" }), {
    status: 201,
  });
}
