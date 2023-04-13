import { Outlet } from 'react-router-dom';

import EventsNavigation from './EventsNavigation';

function EventNavigation() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default EventNavigation;
