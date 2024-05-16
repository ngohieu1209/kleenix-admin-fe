import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { HouseWorkerEditView } from 'src/sections/house-worker/view';

// ----------------------------------------------------------------------

export default function HouseWorkerEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: House Worker Edit</title>
      </Helmet>

      <HouseWorkerEditView id={`${id}`} />
    </>
  );
}
