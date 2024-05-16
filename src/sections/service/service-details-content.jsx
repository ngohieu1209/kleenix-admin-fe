import { useCallback } from 'react';
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
import Button from '@mui/material/Button';

import { useSnackbar } from 'src/components/snackbar';
import { deletePackage } from 'src/api/package';

import { useBoolean } from 'src/hooks/use-boolean';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ASSETS_API } from 'src/config-global';

import Iconify from 'src/components/iconify';

import PackageItem from './package-item';
import PackageQuickEditForm from './package-quick-new-edit';

// ----------------------------------------------------------------------

export default function ServiceDetailsContent({ service }) {
  const { id: serviceId, activate, description, icon, name, packages } = service;

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const quickEdit = useBoolean();

  const handleEdit = useCallback(
    (id) => {
      quickEdit.onTrue();
    },
    [quickEdit]
  );

  const handleNewPackage = useCallback(() => {
    quickEdit.onTrue();
  },[quickEdit]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deletePackage(serviceId, id);
      enqueueSnackbar('Xóa thành công!');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  }, [serviceId, enqueueSnackbar]);

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
        <IconButton onClick={() => router.push(paths.dashboard.service.edit(`${service.id}`))}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Box>
      <Typography variant="h6">Miêu tả</Typography>
      <Typography variant="body1">{description || 'Không có miêu tả'}</Typography>
    </Stack>
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          {renderContent}
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 5,
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      >
        <Typography variant="h4" sx={{ mt: 3 }}>Gói dịch vụ</Typography>
        <Button
            // component={RouterLink}
            // href={paths.dashboard.service.new}
            onClick={handleNewPackage}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ mt: 3 }}
          >
            Tạo gói dịch vụ
          </Button>
      </Box>

      <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{ mt: 3 }}
        >
          {packages.map((packageService) => (
            <Box key={packageService.id}>
              <PackageItem
                key={packageService.id}
                serviceId={serviceId}
                packageService={packageService}
                onEdit={() => handleEdit(packageService.id)}
                onDelete={() => handleDelete(packageService.id)}
              />
            </Box>
          ))}
        </Box>
        <PackageQuickEditForm serviceId={serviceId} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </>
  );
}

ServiceDetailsContent.propTypes = {
  service: PropTypes.object,
};
