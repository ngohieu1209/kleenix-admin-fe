import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ASSETS_API } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ExtraServiceDetailsContent({ extraService }) {
  const { activate, description, icon, name } = extraService;

  const router = useRouter();

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <IconButton onClick={() => router.push(paths.dashboard.extraService.edit(`${extraService.id}`))}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Box>
      <Typography variant="h6">Miêu tả</Typography>
      <Typography variant="body1">{description || 'Không có miêu tả'}</Typography>
    </Stack>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        {renderContent}
      </Grid>
    </Grid>
  );
}

ExtraServiceDetailsContent.propTypes = {
  extraService: PropTypes.object,
};
