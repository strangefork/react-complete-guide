import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  //This function must be getStaticProps - and this is where we load data before the component function is executed.
  //Any code you write in here will ONLY execute on the server, NOT in the browser. It happens during the build process.
  //Fetch data from API/database, or access the file system. But then you return an object.

  //This code is separated by NextJS into a server-side bundle.

  const client = await MongoClient.connect(
    'mongodb+srv://eshlemad:QD2poPLz2oXwl17a@cluster0.fj0oelk.mongodb.net/meetups?retryWrites=true&w=majority'
  ); //This code should NEVER run on the client side.

  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //Incremental static generation. This is the number of sections NextJS will wait before it regenerates the page on the server.
  };
}

export default HomePage;
