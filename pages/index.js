import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { MongoClient } from "mongodb";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(()=>{
  //     setLoadedMeetups(DUMMY_MEETUPS)
  // },[])
  //   return <MeetupList meetups={loadedMeetups} />
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
  
}

// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;
//     // fetch data from an api
//     return {
//         props : {
//             meetups : DUMMY_MEETUPS
//         }
//         // no need of revalidate as it will be pre-render at every request
//     }
// }

export async function getStaticProps() {
  // fetch data from an API
  // we can create a file in api folder to fetch data and can fetch data from that file, but that will be cumbersum
  const client = await MongoClient.connect(
    "mongodb+srv://dhirajsCluster:dhirajsCluster@dhirajscluster.hb47mqe.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
    let meetUps = [];
  try {
    meetUps = await meetupsCollection.find().toArray();
    client.close();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      // meetups : DUMMY_MEETUPS
      // meetups: meetUps,           // the id is not a string is some kind of object hence the data need to convert
      meetups: meetUps.map((meetUp)=> ({
        title : meetUp.title,
        address : meetUp.address,
        image : meetUp.image,
        id : meetUp._id.toString(),
        description : meetUp.description,
      }))
    },
    revalidate: 1,
    // pre-render the page after every second to get the updated page
  };
}

export default HomePage;
