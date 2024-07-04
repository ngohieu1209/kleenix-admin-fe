import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { fCheckAbleToCancelledStatus } from 'src/utils/format-string';

// ----------------------------------------------------------------------

export default function BookingDetailsToolbar({
  status,
  backLink,
  onChangeStatus,
  sx,
  ...other
}) {
  const confirm = useBoolean();
  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
          ...sx,
        }}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backLink}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Trở lại
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        {fCheckAbleToCancelledStatus(status) && (
          <LoadingButton
            color="inherit"
            variant="contained"
            // loading={!publish}
            loadingIndicator="Loading…"
            onClick={confirm.onTrue}
          >
            Huỷ lịch đặt
          </LoadingButton>
        )}
      </Stack>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Huỷ lịch đặt"
        content="Bạn có muốn huỷ lịch đặt?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onChangeStatus();
              confirm.onFalse();
            }}
          >
            Huỷ
          </Button>
        }
      />
    </>
  );
}

BookingDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  status: PropTypes.string,
  onChangeStatus: PropTypes.func,
  sx: PropTypes.object,
};
