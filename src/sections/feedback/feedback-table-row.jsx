import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

import { fDate } from 'src/utils/format-time';
import { fCodeBooking, fShortenString } from 'src/utils/format-string';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function FeedbackTableRow({ row, onViewRow }) {
  const { createdAt, rating, feedback, customer, booking } = row;

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={customer.name}
          src={`${ASSETS_API}/${customer.avatar}`}
          variant='rounded'
          sx={{ mr: 2 }}
        />
        <ListItemText
          primary={customer.name}
          secondary = {`+${customer.phoneCode}${customer.phoneNumber}`}
          primaryTypographyProps={{
            typography: 'body2',
          }}
          secondaryTypographyProps={{
            component: 'span',
          }}
        />
      </TableCell>
      <TableCell>#{fCodeBooking(booking.id)}</TableCell>
      <TableCell>
        <ListItemText
          primary={fDate(createdAt)}
          secondary={fDate(createdAt, 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
          }}
        />
      </TableCell>
      <TableCell sx={{ whiteSpace: 'break-spaces'}}>{fShortenString(feedback)}</TableCell>
      <TableCell>
        <Rating readOnly value={rating} precision={1} size='small' />
      </TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          Xem
        </MenuItem>
      </CustomPopover>
    </>
  );
}

FeedbackTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
