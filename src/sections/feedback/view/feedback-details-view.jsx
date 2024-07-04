import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetFeedback } from 'src/api/feedback'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { FeedbackDetailsSkeleton } from '../feedback-skeleton'
import FeedbackDetailsToolbar from '../feedback-details-toolbar';
import FeedbackDetailsContent from '../feedback-details-content';

// ----------------------------------------------------------------------

export default function FeedbackDetailsView({ id }) {
  const { feedback, feedbackLoading, feedbackError } = useGetFeedback(id)
  const settings = useSettingsContext();

  const renderSkeleton = <FeedbackDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${feedbackError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.feedback.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Trở lại
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderTabs = (
    <Tabs
      value='feedback'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='feedback'
        iconPosition="end"
        value='feedback'
        label="Chi tiết đánh giá"
      />
    </Tabs>
  );

  const renderService = feedback && (
    <>
      <FeedbackDetailsToolbar
        backLink={paths.dashboard.feedback.root}
        onRedirectBooking={() => {
          window.open(paths.dashboard.booking.details(feedback.booking.id), '_blank');
        }}
      />
      {renderTabs}

      <FeedbackDetailsContent feedback={feedback} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {feedbackLoading && renderSkeleton}

      {feedbackError && renderError}

      {feedback && renderService}
    </Container>
  );
}

FeedbackDetailsView.propTypes = {
  id: PropTypes.string,
};
