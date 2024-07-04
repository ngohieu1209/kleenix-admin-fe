import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function AppTopCustomers({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map((customer, index) => (
          <CustomerItem key={customer.id} customer={customer} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

AppTopCustomers.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function CustomerItem({ customer, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={customer.name} src={`${ASSETS_API}/${customer.avatar}`} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{customer.name}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify icon="majesticons:coins" width={14} sx={{ mr: 0.5 }} />
          {fCurrency(customer.usedPay)}
        </Typography>
      </Box>

      <Iconify
        icon="solar:cup-star-bold"
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: '50%',
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(index === 1 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index >= 2 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      />
    </Stack>
  );
}

CustomerItem.propTypes = {
  customer: PropTypes.object,
  index: PropTypes.number,
};
