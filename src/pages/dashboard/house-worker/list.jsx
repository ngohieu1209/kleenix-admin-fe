import { Helmet } from 'react-helmet-async';

import { ServiceListView } from 'src/sections/service/view';

// ----------------------------------------------------------------------

export default function HouseWorkerListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: House Worker List</title>
      </Helmet>

      <ServiceListView />
    </>
  );
}
