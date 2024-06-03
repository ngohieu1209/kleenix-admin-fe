import { Helmet } from 'react-helmet-async';

import { PromotionListView } from 'src/sections/promotion/view';

// ----------------------------------------------------------------------

export default function PromotionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Promotion List</title>
      </Helmet>

      <PromotionListView />
    </>
  );
}
