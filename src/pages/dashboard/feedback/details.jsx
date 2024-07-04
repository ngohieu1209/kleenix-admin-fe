import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { FeedbackDetailsView } from 'src/sections/feedback/view';

// ----------------------------------------------------------------------

export default function FeedbackDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Feedback Details</title>
      </Helmet>

      <FeedbackDetailsView id={`${id}`} />
    </>
  );
}
