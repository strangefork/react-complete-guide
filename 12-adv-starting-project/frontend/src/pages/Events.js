import { NavLink } from 'react-router-dom';

const DUMMY_EVENTS = [
  { id: 'e1', title: 'Neil Gaiman Book Signing' },
  { id: 'e2', title: 'Bungie Recruiting Drive' },
  { id: 'e3', title: 'Tabletop Games Convention' },
];

function EventsPage() {
  return (
    <>
      <main>
        <h1>Events Page</h1>
        <ul>
          {DUMMY_EVENTS.map((event) => (
            <li>
              <NavLink key={event.id} to={event.id}>
                {event.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default EventsPage;
