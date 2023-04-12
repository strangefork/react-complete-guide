import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData(); //React Router will check if a Promise is returned, and get that data for you. No need to decode the Promise.
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  //You can access browser functions here! But you can't use React Hooks.
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    return response; //React will extract this for you when you call useLoaderData;
  }
}
