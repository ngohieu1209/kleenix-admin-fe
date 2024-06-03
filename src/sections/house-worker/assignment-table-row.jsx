import _ from 'lodash';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';


import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Label from 'src/components/label';
import colorStatus from 'src/utils/color-status';

// ----------------------------------------------------------------------

export default function AssignmentTableRow({ row, onViewRow }) {
  const { assignedTime, booking } = row;
  const { bookingPackage, address, status } = booking
  const { customer } = address;
  const { service } = bookingPackage[0].package
  const transformStatus = colorStatus(status);

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover>
      <TableCell>{service.name}</TableCell>
      <TableCell>{customer.name}</TableCell>
      <TableCell>
        <ListItemText
          primary={format(new Date(assignedTime), 'dd MMM yyyy', { locale: vi })}
          secondary={format(new Date(assignedTime), 'p')}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
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
        arrow="left-top"
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

AssignmentTableRow.propTypes = {
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
