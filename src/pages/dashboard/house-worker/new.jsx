import { Helmet } from 'react-helmet-async';

import { HouseWorkerCreateView } from 'src/sections/house-worker/view';

// ----------------------------------------------------------------------

export default function HouseWorkerCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new house worker</title>
      </Helmet>

      <HouseWorkerCreateView />
    </>
  );
}
