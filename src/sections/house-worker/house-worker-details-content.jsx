import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

import { ASSETS_API } from 'src/config-global';
import AssignmentList from './assignment-list';

// ----------------------------------------------------------------------

export default function HouseWorkerDetailsContent({ houseWorker }) {
  const { name, username, gender, age, createdAt, avatar } = houseWorker;

  const renderSecondary = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center">
        <Avatar
          alt={name}
          src={`${ASSETS_API}/${avatar}`}
          variant='circular'
          sx={{ mr: 2, width: 40, height: 40 }}
        />
        <ListItemText
          primary={name}
          secondary={username}
          primaryTypographyProps={{
            variant: 'body2',
          }}
          secondaryTypographyProps={{
            component: 'span',
          }}
        />
      </Box>
      <Typography variant="body2">Tuổi: {age}</Typography>
      <Typography variant="body2">Giới tính: {gender === 'FEMALE' ? 'Nữ' : 'Nam'}</Typography>
      <Typography variant="body2">Ngày tạo: {fDateTime(createdAt)}</Typography>
    </Stack>
  );


  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <AssignmentList houseWorker={houseWorker}/>
      </Grid>
      <Grid xs={12} md={4}>
        {renderSecondary}
      </Grid>
    </Grid>
  );
}

HouseWorkerDetailsContent.propTypes = {
  houseWorker: PropTypes.object,
};
