import { Helmet } from 'react-helmet-async';

import { ExtraServiceCreateView } from 'src/sections/extra-service/view';

// ----------------------------------------------------------------------

export default function ExtraServiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new extra service</title>
      </Helmet>

      <ExtraServiceCreateView />
    </>
  );
}
