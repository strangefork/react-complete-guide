import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function EventsRoot() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default EventsRoot;
