import { Helmet } from 'react-helmet-async';

import { FeedbackListView } from 'src/sections/feedback/view';

// ----------------------------------------------------------------------

export default function FeedbackListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Feedback List</title>
      </Helmet>

      <FeedbackListView />
    </>
  );
}
