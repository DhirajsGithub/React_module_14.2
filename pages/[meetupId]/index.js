import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
// ObjectId converts normal string id to mongodb specific id 

function MeetupDetails(props) {
  return (
    // <MeetupDetail
    //   image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
    //   title="First Meetup"
    //   address="Some Street 5, Some City"
    //   description="This is a first meetup"
    // />

    <Fragment>
    <Head>
      <title>{props.meetUpData.title}</title>
      <meta name="description" content={props.meetUpData.description} />
    </Head>
    <MeetupDetail
    image= {props.meetUpData.image}
    title={props.meetUpData.title}
    address={props.meetUpData.address}
    description={props.meetUpData.description}
  />
  </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Mycluster:FQOfwqsBqF4YD3jg@cluster0.djouu.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  let meetups = [];
  try {
    meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // find all id's only of meetups
    client.close();
  } catch (error) {
    console.log("in error");
    console.log(error);
  }

  return {
    // fallback: false,
    fallback : 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // getStaticProps don't have req and res
  // the context parameter is an object, params contains the route parameters for pages using dynamic routes.
  const meetupId = context.params.meetupId;
  // fetch data for a single meetup

  const client = await MongoClient.connect(
    "mongodb+srv://Mycluster:FQOfwqsBqF4YD3jg@cluster0.djouu.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  let selectedMeetup = {};
  try {
    selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) }); // returns a promise
    client.close();
  } catch (error) {
    console.log("in error");
    console.log(error);
  }
  

  console.log(meetupId);
  // in devloper terminal and not in the browser

  return {
    props : {
      // meetUpData : selectedMeetup
      meetUpData : {
        id : selectedMeetup._id.toString(),
        title : selectedMeetup.title,
        image : selectedMeetup.image,
        address  : selectedMeetup.address,
        description : selectedMeetup.description
      }
    },
    // props: {
    //   meetupData: {
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    //     id: meetupId,
    //     title: "First Meetup",
    //     address: "Some Street 5, Some City",
    //     description: "This is a first meetup",
    //   },
    // },
  };
}

export default MeetupDetails;
