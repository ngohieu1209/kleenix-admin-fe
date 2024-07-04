import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';

import { ListItemText } from '@mui/material';
import { fDateTime } from 'src/utils/format-time';
import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function FeedbackDetailsContent({ feedback }) {
  const { createdAt, rating, feedback: body, booking, customer } = feedback;
  const { assignment, bookingPackage, bookingExtraService, dateTime } = booking
  const { houseWorker } = assignment[0];
  const { service } = bookingPackage[0].package;

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">Thông tin đánh giá</Typography>
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

      {/* NỘI DUNG PHẢN HỒI */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Box display='flex' alignItems='center' >
        <Typography variant="body2" sx={{ mr: 1 }}>Đánh giá: </Typography>
        <Rating readOnly value={rating} precision={1} size='small' />
      </Box>
      <Typography variant="body2">Nội dung phản hồi: </Typography>
      <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'yellow'}}>{body}</Typography>

      {/* NGÀY LÀM VIỆC */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Thời gian làm việc: </Typography>
      <Typography variant="body1">{fDateTime(dateTime)}</Typography>

      {/* NGÀY ĐÁNH GIÁ */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body2">Thời gian đánh giá: </Typography>
      <Typography variant="body1">{fDateTime(createdAt)}</Typography>
    </Stack>
  );

  const renderSecondary = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      <Typography variant="h5">{service.name}</Typography>
      {/* DỊCH VỤ */}
      <Box
        sx={{
          borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
        }}
      />
      <Typography variant="body1">Gói dịch vụ</Typography>
      {bookingPackage.map((item) => (
        <Box
          key={item.id}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant="body2">• {item.package.name} {item.quantity > 1 ? `x ${item.quantity}` : ''}</Typography>
        </Box>
      ))}

      {/* DỊCH VỤ THÊM */}
      {bookingExtraService.length > 0 && (
        <>
          <Box
            sx={{
              borderTop: (theme) => `dashed 2px ${theme.palette.background.neutral}`,
            }}
          />
          <Typography variant="body1">Dịch vụ thêm</Typography>
          {bookingExtraService.map((item) => (
            <Box
              key={item.id}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant="body2">• {item.extraService.name}</Typography>
              {/* <Typography variant="body2">{fCurrency(Number(item.extraService.price))}</Typography> */}
            </Box>
          ))}
        </>
      )}
    </Stack>
  );

  const renderTertiary = (
    <Stack component={Card} spacing={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6">Người thực hiện</Typography>
      {/* GIÚP VIỆC */}
        <Box display="flex" alignItems="center">
          <Avatar
            alt={houseWorker.name}
            src={`${ASSETS_API}/${houseWorker.avatar}`}
            variant='circular'
            sx={{ mr: 2, width: 48, height: 48 }}
          />
          <ListItemText
            primary={houseWorker.name}
            secondary={houseWorker.username}
            primaryTypographyProps={{
              variant: 'body1',
            }}
            secondaryTypographyProps={{
              component: 'span',
            }}
          />
        </Box>
    </Stack>
  );


  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={7}>
        {renderContent}
      </Grid>

      <Grid xs={12} md={5}>
        {renderTertiary}
        {renderSecondary}
      </Grid>
    </Grid>
  );
}

FeedbackDetailsContent.propTypes = {
  feedback: PropTypes.object,
};
