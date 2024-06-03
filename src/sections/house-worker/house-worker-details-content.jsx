import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import { fDateTime } from 'src/utils/format-time';

import { ASSETS_API } from 'src/config-global';
import AssignmentList from './assignment-list';

// ----------------------------------------------------------------------

export default function HouseWorkerDetailsContent({ houseWorker }) {
  const { name, username, gender, age, createdAt } = houseWorker;

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h6">Danh sách công việc</Typography>

      <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Trạng thái</InputLabel>

          <Select
            label="Trạng thái"
          >
            {['Tất cả', 'Đang thực hiện', 'Đã hoàn thành'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      {/* <Box display="flex" alignItems="center">
          <Avatar
            alt={name}
            // src={`${ASSETS_API}/${icon}`}
            variant='circular'
            sx={{ mr: 2, width: 48, height: 48 }}
          />
          <ListItemText
            primary={name}
            secondary={username}
            primaryTypographyProps={{
              variant: 'body1',
            }}
            secondaryTypographyProps={{
              component: 'span',
            }}
          />
        </Box>
        <Typography variant="body1">Giới tính: {gender === 'FEMALE' ? 'Nữ' : 'Nam'}</Typography> */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar
            alt={name}
            src={`${ASSETS_API}/${icon}`}
            variant='rounded'
            sx={{ mr: 2 }}
          />
          <Typography variant="h4">{name}</Typography>
          <Tooltip title={activate ? 'Đang hoạt động' : 'Không hoạt động'}>
            <Chip
              label={activate ? 'Hoạt động' : 'Không hoạt động'}
              color={activate ? 'success' : 'error'}
              sx={{ ml: 2, color: 'black'}}
              size='small'
            />
          </Tooltip>
        </Box>
        <IconButton onClick={() => router.push(paths.dashboard.service.edit(`${houseWorker.id}`))}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Box>
      <Typography variant="h6">Miêu tả</Typography>
      <Typography variant="body1">{description || 'Không có miêu tả'}</Typography> */}
    </Stack>
  );

  const renderSecondary = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center">
        <Avatar
          alt={name}
          // src={`${ASSETS_API}/${icon}`}
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
        {/* {renderContent} */}
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
