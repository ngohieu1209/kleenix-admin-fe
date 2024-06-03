import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PromotionDetailsView } from 'src/sections/promotion/view';

// ----------------------------------------------------------------------

export default function PromotionDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Promotion Details</title>
      </Helmet>

      <PromotionDetailsView id={`${id}`} />
    </>
  );
}
