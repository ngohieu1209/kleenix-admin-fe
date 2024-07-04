import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function BookingTableToolbar({
  filters,
  onFilters,
    //
  canReset,
  onResetFilters,
  dateError
}) {
  const handleFilterBooking = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onFilters('endDate', newValue);
    },
    [onFilters]
  );

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    >
      <DatePicker
        label="Ngày bắt đầu"
        value={filters.startDate}
        onChange={handleFilterStartDate}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
        sx={{
          maxWidth: { md: 200 },
        }}
      />

      <DatePicker
        label="Ngày kết thúc"
        value={filters.endDate}
        onChange={handleFilterEndDate}
        slotProps={{
          textField: {
            fullWidth: true ,
            error: dateError,
            helperText: dateError && 'Ngày kết thúc phải sau ngày bắt đầu',
          }
        }}
        sx={{
          maxWidth: { md: 200 },
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ width: 1 }}
      >
        <TextField
          sx={{ width: { xs: 1, sm: 260 } }}
          fullWidth
          value={filters.booking}
          onChange={handleFilterBooking}
          placeholder="Tìm kiếm ..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {canReset && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Xóa
        </Button>
      )}
    </Stack>
  );
}

BookingTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  canReset: PropTypes.bool,
  onResetFilters: PropTypes.func,
  dateError: PropTypes.bool
};
