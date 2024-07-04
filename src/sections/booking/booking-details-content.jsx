import PropTypes from 'prop-types';
import { addMinutes } from 'date-fns';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { ASSETS_API } from 'src/config-global';

import { ListItemText } from '@mui/material';
import { fAddress } from 'src/utils/format-address';
import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { fCodeBooking } from 'src/utils/format-string';

// ----------------------------------------------------------------------

export default function BookingDetailsContent({ booking }) {
  const { id, address, bookingExtraService, bookingPackage, createdAt, dateTime, duration, note, totalPrice, customerPromotion, assignment } = booking;
  const { customer } = address;
  const selectedPromotion = customerPromotion.length > 0 ? customerPromotion[0] : null;
  const expectedEndTime = addMinutes(new Date(dateTime), duration);

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">Mã đơn booking: #{fCodeBooking(id)}</Typography>
      {/* KHÁCH HÀNG */}
      <Typography variant="body2">Khách hàng</Typography>
      <Box display="flex" alignItems="center">
        <Avatar
          alt={customer.name}
          src={`${ASSETS_API}/${customer.avatar}`}
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
              <Typography variant="body1">{item.extraService.name}</Typography>
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
              <Typography variant="body2">• {item.extraService.name}</Typography>
              <Typography variant="body2">{fCurrency(Number(item.extraService.price))}</Typography>
            </Box>
          ))}
        </>
      )}

      {/* KHUYẾN MÃI */}
      {selectedPromotion && (
        <>
          <Box
            sx={{
              borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
            }}
          />
          <Typography variant="body1">Khuyến mãi</Typography>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant="body2">{selectedPromotion.promotion.name}</Typography>
            <Typography variant="body2">- {fCurrency(Number(selectedPromotion.promotion.discount))}</Typography>
          </Box>
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

  const renderTertiary = assignment && (
    <Stack component={Card} spacing={2} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5">Nhận đơn</Typography>
      <Box display="flex" alignItems="center">
        <Avatar
          alt={assignment.houseWorker.name}
          src={`${ASSETS_API}/${assignment.houseWorker.avatar}`}
          variant='circular'
          sx={{ mr: 2, width: 40, height: 40 }}
        />
        <ListItemText
          primary={assignment.houseWorker.name}
          secondary={assignment.houseWorker.username}
          primaryTypographyProps={{
            variant: 'body2',
          }}
          secondaryTypographyProps={{
            component: 'span',
          }}
        />
      </Box>
      <Typography variant="body2">Tuổi: {assignment.houseWorker.age}</Typography>
      <Typography variant="body2">Giới tính: {assignment.houseWorker.gender === 'FEMALE' ? 'Nữ' : 'Nam'}</Typography>
      <Typography variant="body2">Ngày nhận lịch: {fDateTime(assignment.assignedTime)}</Typography>
    </Stack>
  );


  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={7}>
        {renderContent}
      </Grid>

      <Grid xs={12} md={5}>
        {renderSecondary}
        {assignment && renderTertiary}
      </Grid>
    </Grid>
  );
}

BookingDetailsContent.propTypes = {
  booking: PropTypes.object,
};
