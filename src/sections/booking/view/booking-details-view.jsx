import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetBooking, updateStatus } from 'src/api/booking'

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import colorStatus from 'src/utils/color-status';

import { BookingDetailsSkeleton } from '../booking-skeleton'
import BookingDetailsToolbar from '../booking-details-toolbar';
import BookingDetailsContent from '../booking-details-content';

// ----------------------------------------------------------------------

export default function BookingDetailsView({ id }) {
  const { booking, bookingLoading, bookingError } = useGetBooking(id)
  const settings = useSettingsContext();
  const [status, setStatus] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if(booking) {
      setStatus(colorStatus(booking.status));
    }
  }, [booking])

  const onChangeStatus = useCallback(async () => {
    try {
      await updateStatus(id, { status: 'CANCELLED_BY_KLEENIX'})
      enqueueSnackbar('Huỷ lịch đặt thành công');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  }, [id, enqueueSnackbar])

  const renderSkeleton = <BookingDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${bookingError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.booking.root}
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
      value='booking'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='booking'
        iconPosition="end"
        value='booking'
        label="Chi tiết đặt lịch"
      />
    </Tabs>
  );

  const renderService = booking && (
    <>
      <BookingDetailsToolbar
        backLink={paths.dashboard.booking.root}
        onChangeStatus={() => onChangeStatus(id)}
        status={booking.status}
      />
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Box>
          {renderTabs}
        </Box>
        {status && (
          <Label
            variant="soft"
            sx={{ backgroundColor: status.color, color: 'black'}}
          >
            {status.body}
          </Label>
        )}
      </Box>

      <BookingDetailsContent booking={booking} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {bookingLoading && renderSkeleton}

      {bookingError && renderError}

      {booking && renderService}
    </Container>
  );
}

BookingDetailsView.propTypes = {
  id: PropTypes.string,
};
