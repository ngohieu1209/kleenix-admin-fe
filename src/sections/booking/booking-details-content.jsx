import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { addMinutes } from 'date-fns';

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

import { useBoolean } from 'src/hooks/use-boolean';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ASSETS_API } from 'src/config-global';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ListItemText } from '@mui/material';
import { fAddress } from 'src/utils/format-address';
import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function BookingDetailsContent({ booking }) {
  const { address, bookingExtraService, bookingPackage, createdAt, dateTime, duration, note, status, totalPrice } = booking;
  const { customer } = address;
  const { service } = bookingPackage[0].package;

  const expectedEndTime = addMinutes(new Date(dateTime), duration);

  const router = useRouter();

  const quickEdit = useBoolean();

  const handleNewPackage = useCallback(() => {
    quickEdit.onTrue();
  },[quickEdit]);

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">Thông tin chi tiết</Typography>
      {/* KHÁCH HÀNG */}
      <Typography variant="body2">Khách hàng</Typography>
      <Box display="flex" alignItems="center">
        <Avatar
          alt={customer.name}
          // src={`${ASSETS_API}/${icon}`}
          variant='circular'
          sx={{ mr: 2, width: 48, height: 48 }}
        />
        <ListItemText
          primary={customer.name}
          secondary={`+${customer.phoneCode}${customer.phoneNumber}`}
          primaryTypographyProps={{
            variant: 'body1',
          }}
          secondaryTypographyProps={{
            component: 'span',
          }}
        />
      </Box>
      <Typography variant="body1">Địa chỉ: {fAddress(address)}</Typography>

      {/* NGÀY ĐẶT LỊCH */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Ngày đặt lịch</Typography>
      <Typography variant="body1">{fDateTime(createdAt)}</Typography>

      {/* THỜI GIAN BẮT ĐẦU */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Thời gian bắt đầu</Typography>
      <Typography variant="body1">{fDateTime(dateTime)}</Typography>

      {/* THỜI GIAN KẾT THÚC DỰ KIẾN */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Thời gian kết thúc dự kiến</Typography>
      <Typography variant="body1">{fDateTime(expectedEndTime)}</Typography>

      {/* GÓI DỊCH VỤ */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Gói dịch vụ</Typography>
      {bookingPackage.map((item) => (
        <Box
          key={item.id}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant="body1">{item.package.name}</Typography>
          {item.quantity > 1 && (
            <Typography variant="body1">x {item.quantity}</Typography>
          )}
        </Box>
      ))}

      {/* GÓI DỊCH VỤ THÊM */}
      {bookingExtraService.length > 0 && (
        <>
          <Box
            sx={{
              borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
            }}
          />
          <Typography variant="body2">Gói dịch vụ thêm</Typography>
          {bookingExtraService.map((item) => (
            <Box
              key={item.id}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant="body1">{item.name}</Typography>
            </Box>
          ))}
        </>
      )}

      {/* GHI CHÚ */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Ghi chú</Typography>
      <Typography variant="body1">{note || 'Không có'}</Typography>
    </Stack>
  );

  const renderSecondary = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      <Typography variant="h4">Chi phí</Typography>
      {/* PHÍ DỊCH VỤ */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body1">Phí dịch vụ</Typography>
      {bookingPackage.map((item) => (
        <Box
          key={item.id}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant="body2">• {item.package.name} {item.quantity > 1 ? `x ${item.quantity}` : ''}</Typography>
          <Typography variant="body2">{fCurrency(Number(item.package.price * item.quantity))}</Typography>
        </Box>
      ))}

      {/* PHÍ DỊCH VỤ THÊM */}
      {bookingExtraService.length > 0 && (
        <>
          <Box
            sx={{
              borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
            }}
          />
          <Typography variant="body1">Phí dịch vụ thêm</Typography>
          {bookingExtraService.map((item) => (
            <Box
              key={item.id}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant="body2">• {item.name}</Typography>
              <Typography variant="body2">{fCurrency(Number(item.price))}</Typography>
            </Box>
          ))}
        </>
      )}

      {/* TỔNG CỘNG */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography variant="h6" color='#FF9C01'>TỔNG CỘNG</Typography>
        <Typography variant="h6" color='#FF9C01'>{fCurrency(Number(totalPrice))}</Typography>
      </Box>
    </Stack>
  );


  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={7}>
          {renderContent}
        </Grid>

        <Grid xs={12} md={5}>
          {renderSecondary}
        </Grid>
      </Grid>
    </>
  );
}

BookingDetailsContent.propTypes = {
  booking: PropTypes.object,
};
