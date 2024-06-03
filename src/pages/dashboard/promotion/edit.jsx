import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PromotionEditView } from 'src/sections/promotion/view';

// ----------------------------------------------------------------------

export default function PromotionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Promotion Edit</title>
      </Helmet>

      <PromotionEditView id={`${id}`} />
    </>
  );
}
