import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FeedbackDetailsToolbar({
  status,
  backLink,
  onRedirectBooking,
  sx,
  ...other
}) {
  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
      {...other}
    >
      <Button
        component={RouterLink}
        href={backLink}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
      >
        Trở lại
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      <LoadingButton
        color="inherit"
        variant="contained"
        // loading={!publish}
        loadingIndicator="Loading…"
        onClick={onRedirectBooking}
      >
        Xem đơn booking
      </LoadingButton>
    </Stack>
  );
}

FeedbackDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  status: PropTypes.string,
  onRedirectBooking: PropTypes.func,
  sx: PropTypes.object,
};
