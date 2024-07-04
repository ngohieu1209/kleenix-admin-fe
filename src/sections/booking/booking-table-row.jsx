import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ASSETS_API } from 'src/config-global';
import colorStatus from 'src/utils/color-status';
import { fCodeBooking } from 'src/utils/format-string';

// ----------------------------------------------------------------------

export default function BookingTableRow({ row, onViewRow }) {
  const { id, createdAt, totalPrice, status, address, bookingPackage } = row;
  const { customer } = address;
  const { service } = bookingPackage[0].package
  const transformStatus = colorStatus(status);

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
      <TableCell>#{fCodeBooking(id)}</TableCell>
      <TableCell sx={{ whiteSpace: 'break-spaces' }}>{service.name}</TableCell>
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
      <TableCell>{fCurrency(totalPrice)}</TableCell>
      <TableCell>
        <Label
          variant="soft"
          sx={{ backgroundColor: transformStatus.color, color: 'black' }}
        >
          {transformStatus.body}
        </Label>
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

BookingTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
