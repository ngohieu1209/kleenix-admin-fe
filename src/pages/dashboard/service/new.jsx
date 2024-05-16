import { Helmet } from 'react-helmet-async';

import { ServiceCreateView } from 'src/sections/service/view';

// ----------------------------------------------------------------------

export default function ServiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new service</title>
      </Helmet>

      <ServiceCreateView />
    </>
  );
}
