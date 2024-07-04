import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function EcommerceCurrentBalance({
  title,
  bookingAmount,
  currentBalance,
  sx,
  ...other
}) {

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{fCurrency(currentBalance)}</Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Tổng số đơn hoàn thành
          </Typography>
          <Typography variant="body2">{bookingAmount}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

EcommerceCurrentBalance.propTypes = {
  currentBalance: PropTypes.string,
  bookingAmount: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
};
