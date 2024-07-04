import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ASSETS_API } from 'src/config-global';

import WorkerPasswordNewForm from './worker-password-new-form';

// ----------------------------------------------------------------------

export default function HouseWorkerTableRow({ row, onViewRow, onEditRow, onDeleteRow }) {
  const { id, name, username, age, gender, createdAt, avatar } = row;

  const confirm = useBoolean();

  const popover = usePopover();
  const quickNew = useBoolean();

  const renderPrimary = (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={name}
          src={`${ASSETS_API}/${avatar}`}
          variant='rounded'
          sx={{ mr: 2 }}
        />
        <ListItemText
          primary={name}
          secondary={username}
          primaryTypographyProps={{
            typography: 'body2',
          }}
          secondaryTypographyProps={{
            component: 'span',
          }}
        />
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{age}</TableCell>
      <TableCell>{gender === "FEMALE" ? 'Nữ' : 'Nam'}</TableCell>
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

        <MenuItem
          onClick={() => {
            quickNew.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:key-bold" />
          Mật khẩu
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Sửa
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Xóa
        </MenuItem>

      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Xóa"
        content="Bạn có muốn xóa khóa học này không?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Xóa
          </Button>
        }
      />
      <WorkerPasswordNewForm open={quickNew.value} onClose={quickNew.onFalse} houseWorkerId={id} />
    </>
  );
}

HouseWorkerTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  row: PropTypes.object,
};
