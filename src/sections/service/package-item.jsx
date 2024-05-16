import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fMinutesToHours } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import PackageQuickEditForm from './package-quick-new-edit';

// ----------------------------------------------------------------------

export default function PackageItem({ serviceId, packageService, onDelete }) {
  const quickEdit = useBoolean();

  const popover = usePopover();

  const { name, price, duration, description, activate } = packageService;

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link component={RouterLink} href={paths.dashboard.service.root} color="inherit">
                {name}
              </Link>
            }
            secondary={description}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'body2',
            }}
          />

          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption' }}
          >
            {activate ? (
              <>
                <Iconify width={16} icon="material-symbols:check-circle-outline" color='green' />
                <Typography variant="caption" noWrap>
                  Đang hoạt động
                </Typography>
              </>
            ) : (
              <>
                <Iconify width={16} icon="material-symbols:cancel-outline" color='red' />
                <Typography variant="caption" noWrap>
                  Đang hoạt động
                </Typography>
              </>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
          {[
            {
              label: fCurrency(price),
              icon: <Iconify width={16} icon="solar:tag-price-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: `${fMinutesToHours(duration)}h`,
              icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
            }
          ].map((item) => (
            <Stack
              key={item.label}
              spacing={0.5}
              flexShrink={0}
              direction="row"
              alignItems="center"
              sx={{ minWidth: 0 }}
            >
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Card>

      <PackageQuickEditForm  serviceId={serviceId} currentPackage={packageService} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            quickEdit.onTrue();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Sửa
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Xoá
        </MenuItem>
      </CustomPopover>
    </>
  );
}

PackageItem.propTypes = {
  serviceId: PropTypes.string,
  packageService: PropTypes.object,
  onDelete: PropTypes.func,
};
