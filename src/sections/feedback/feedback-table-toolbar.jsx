import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// ----------------------------------------------------------------------

export default function FeedbackTableToolbar({
  filters,
  onFilters,
    //
  canReset,
  onResetFilters,
  dateError
}) {

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
    </Stack>
  );
}

FeedbackTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  canReset: PropTypes.bool,
  onResetFilters: PropTypes.func,
  dateError: PropTypes.bool
};
