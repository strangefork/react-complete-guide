import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a second meetup',
  },
];

function HomePage(props) {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   //This will dynamically generate the page for each request.
//   //This code only runs on the server.
//   //This is slower than getStaticProps, because it can be cached and re-used. Should only use this if we need the context obj, or if the data changes multiple times every sencond.

//   const req = context.request;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  //This function must be getStaticProps - and this is where we load data before the component function is executed.
  //Any code you write in here will ONLY execute on the server, NOT in the browser. It happens during the build process.
  //Fetch data from API/database, or access the file system. But then you return an object.
  return {
    props: {
      meetups: DUMMY_MEETUPS, //Data fetching being done during the build process. (I'm still not clear how the timing of this helps, but okay.)
    },
    revalidate: 1, //Incremental static generation. This is the number of sections NextJS will wait before it regenerates the page on the server.
  };
}

export default HomePage;
