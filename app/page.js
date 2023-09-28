import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";

export const revalidate = 1

export const metadata = {
  title: "Meetups",
  description: "browse a huge list of meetups!",
};

export default async function HomePage() {
  const meetups = await getMeetups();

  return <MeetupList meetups={meetups} />;
}

async function getMeetups() {
  const client = await MongoClient.connect(
    "mongodb+srv://silentassasin99heasshots:dAYmykGfInFM6JVC@cluster0.ftnjneb.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetupData = await meetupCollection.find().toArray();

  const meetups = meetupData.map((meetup) => {
    return {
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
      description: meetup.description,
      id: meetup._id.toString(),
    };
  });

  client.close();
  return meetups;
}