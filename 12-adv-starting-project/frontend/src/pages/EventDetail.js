import { NavLink, useParams } from 'react-router-dom';

function EventDetailPage() {
  const params = useParams();
  return (
    <>
      <main>
        <h1>Event Details</h1>
        <p>{params.id}</p>
        <NavLink to='..' relative='path'>
          Back
        </NavLink>
      </main>
    </>
  );
}

export default EventDetailPage;
