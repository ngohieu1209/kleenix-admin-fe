import { Helmet } from 'react-helmet-async';

import { HouseWorkerListView } from 'src/sections/house-worker/view';

// ----------------------------------------------------------------------

export default function HouseWorkerListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: House Worker List</title>
      </Helmet>

      <HouseWorkerListView />
    </>
  );
}
