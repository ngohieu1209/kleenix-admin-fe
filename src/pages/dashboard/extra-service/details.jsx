import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ExtraServiceDetailsView } from 'src/sections/extra-service/view';

// ----------------------------------------------------------------------

export default function ExtraServiceDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Extra Service Details</title>
      </Helmet>

      <ExtraServiceDetailsView id={`${id}`} />
    </>
  );
}
