import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

export async function generateMetadata({params}) {
  const meetupId = new ObjectId(params.meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://silentassasin99heasshots:dAYmykGfInFM6JVC@cluster0.ftnjneb.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.findOne({_id: meetupId});

  client.close();

  return {
    title: meetup.title,
    description: meetup.description
  }
}

export async function generateStaticParams() {
  const client = await MongoClient.connect(
    "mongodb+srv://silentassasin99heasshots:dAYmykGfInFM6JVC@cluster0.ftnjneb.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return meetups.map((meetup) => ({
    meetupId: meetup._id.toString(),
  }));
}

async function getMeetup(meetupId) {
  const client = await MongoClient.connect(
    "mongodb+srv://silentassasin99heasshots:dAYmykGfInFM6JVC@cluster0.ftnjneb.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const selectedMeetup = await meetupCollection.findOne({ _id: meetupId });

  console.log(selectedMeetup._id);
  client.close();

  return {
    id: selectedMeetup._id.toString(),
    title: selectedMeetup.title,
    address: selectedMeetup.address,
    image: selectedMeetup.image,
    description: selectedMeetup.description,
  };
}

export default async function MeetupDetails({ params }) {
  const meetupId = new ObjectId(params.meetupId);
  const meetup = await getMeetup(meetupId);

  return (
    <MeetupDetail
      title={meetup.title}
      image={meetup.image}
      description={meetup.description}
      address={meetup.address}
    />
  );
}
