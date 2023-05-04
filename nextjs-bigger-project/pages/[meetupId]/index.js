import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  //We have to pre-generate all the urls that could exist
  const client = await MongoClient.connect(
    'mongodb+srv://eshlemad:QD2poPLz2oXwl17a@cluster0.fj0oelk.mongodb.net/meetups?retryWrites=true&w=majority'
  ); //This code should NEVER run on the client side.

  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //This will only get the _id field value.
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = new ObjectId(context.params.meetupId);
  const client = await MongoClient.connect(
    'mongodb+srv://eshlemad:QD2poPLz2oXwl17a@cluster0.fj0oelk.mongodb.net/meetups?retryWrites=true&w=majority'
  ); //This code should NEVER run on the client side.

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: meetupId,
  });
  console.log(selectedMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
