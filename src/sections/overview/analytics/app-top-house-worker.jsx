import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function AppTopHouseWorkers({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['bookingCount'], ['desc']).map((houseWorker, index) => (
          <HouseWorkerItem key={houseWorker.id} houseWorker={houseWorker} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

AppTopHouseWorkers.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function HouseWorkerItem({ houseWorker, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={houseWorker.name} src={`${ASSETS_API}/${houseWorker.avatar}`} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{houseWorker.name}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          Số đơn hoàn thành: {houseWorker.bookingCount}
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

HouseWorkerItem.propTypes = {
  houseWorker: PropTypes.object,
  index: PropTypes.number,
};
