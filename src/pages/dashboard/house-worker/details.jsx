import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { HouseWorkerDetailsView } from 'src/sections/house-worker/view';

// ----------------------------------------------------------------------

export default function HouseWorkerDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: House Worker Details</title>
      </Helmet>

      <HouseWorkerDetailsView id={`${id}`} />
    </>
  );
}
