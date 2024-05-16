import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ExtraServiceEditView } from 'src/sections/extra-service/view';

// ----------------------------------------------------------------------

export default function ExtraServiceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Extra Service Edit</title>
      </Helmet>

      <ExtraServiceEditView id={`${id}`} />
    </>
  );
}
