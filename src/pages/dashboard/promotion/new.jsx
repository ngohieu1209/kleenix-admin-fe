import { Helmet } from 'react-helmet-async';

import { PromotionCreateView } from 'src/sections/promotion/view';

// ----------------------------------------------------------------------

export default function PromotionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new promotion</title>
      </Helmet>

      <PromotionCreateView />
    </>
  );
}
