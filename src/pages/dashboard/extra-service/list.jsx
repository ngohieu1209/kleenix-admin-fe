import { Helmet } from 'react-helmet-async';

import { ExtraServiceListView } from 'src/sections/extra-service/view';

// ----------------------------------------------------------------------

export default function ExtraServiceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Extra Service List</title>
      </Helmet>

      <ExtraServiceListView />
    </>
  );
}
