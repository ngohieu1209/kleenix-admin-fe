import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { resetPassword } from 'src/api/house-worker'
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function WorkerPasswordNewForm({ open, onClose, houseWorkerId }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewRankerSchema = Yup.object().shape({
    password: Yup.string().required('Không được bỏ trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  });

  const defaultValues = useMemo(
    () => ({
      password: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewRankerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword(data, houseWorkerId);
      reset();
      onClose();
      enqueueSnackbar('Đặt mật khẩu thành công!');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          onClose();
        }
      }}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Đặt Mật Khẩu</DialogTitle>

        <DialogContent>
          <Box
            sx={{ mt: 1 }}
            rowGap={3}
            columnGap={2}
            display="grid"
          >
            <RHFTextField name="password" label="Mật khẩu " />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => {
            reset();
            onClose();
          }}>
            Hủy
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>Đặt</LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

WorkerPasswordNewForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  houseWorkerId: PropTypes.number,
};
