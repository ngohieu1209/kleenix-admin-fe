import { Helmet } from 'react-helmet-async';

import { ServiceListView } from 'src/sections/service/view';

// ----------------------------------------------------------------------

export default function ServiceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Service List</title>
      </Helmet>

      <ServiceListView />
    </>
  );
}