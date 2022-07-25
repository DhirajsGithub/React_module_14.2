import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";

function NewMeetupPage() {
  const router = useRouter();
  // function addMeetupHandler(enteredMeetupData) {
  //   console.log(enteredMeetupData);
  // }
  async function addMeetupHandler(enteredMeetupData) {
    try {
      // const result = await fetch("http://some-domain.com/abc")   // if it's external api
      const result = await fetch("/api/new-meetup", {
        // internor api which will be hosted by same api as it will for this page
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // nextjs will trigger this function when request reaches this path
      const data = await result.json();
      console.log(data);
      // router.push/replace 
      router.push("/")

    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Fragment>
  <Head>
    <title>Add a New Meetup</title>
    <meta name="description" content="Add your own meetup and create amazing networking opportunities" />
  </Head>
  <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>
  )
}

export default NewMeetupPage;

