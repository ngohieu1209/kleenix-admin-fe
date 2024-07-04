import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ASSETS_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function PromotionDetailsContent({ promotion }) {
  const { activate, description, image, name, discount, point, amount, startTime, endTime } = promotion;

  const router = useRouter();

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
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
        <IconButton onClick={() => router.push(paths.dashboard.promotion.edit(`${promotion.id}`))}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Box>
      <Image
        alt={name}
        src={`${ASSETS_API}/${image}`}
        ratio="16/9"
        sx={{ borderRadius: 1 }}
      />
      <Typography variant="h6">Miêu tả</Typography>
      <Typography variant="body1">{description || 'Không có miêu tả'}</Typography>
    </Stack>
  );

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Giảm giá',
          value: fCurrency(discount),
          icon: <Iconify icon="solar:tag-price-bold" />,
        },
        {
          label: 'Số lượt còn lại',
          value: amount,
          icon: <Iconify icon="carbon:rotate-counterclockwise-filled" />,
        },
        {
          label: 'Điểm cần đổi',
          value: point,
          icon: <Iconify icon="mingcute:counter-2-line" />,
        },
        {
          label: 'Hiệu lực',
          value: `${fDate(startTime)} ~ ${fDate(endTime)}`,
          icon: <Iconify icon="solar:calendar-date-bold" />,
        }
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Stack>
  );


  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        {renderContent}
      </Grid>

      <Grid xs={12} md={4}>
        {renderOverview}
      </Grid>
    </Grid>
  );
}

PromotionDetailsContent.propTypes = {
  promotion: PropTypes.object,
};
