import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFCheckbox } from 'src/components/hook-form';

import { createPackage, updatePackage } from 'src/api/package';

// ----------------------------------------------------------------------

export default function PackageQuickEditForm({ serviceId, currentPackage, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const NewPackageSchema = Yup.object().shape({
    name: Yup.string().required('Tên không được để trống'),
    description: Yup.string().required('Mô tả không được để trống'),
    activate: Yup.boolean().default(false),
    price: Yup.number().typeError('Giá phải là một số').min(0, 'Giá không thể nhỏ hơn 0').required('Giá không được bỏ trống'),
    duration: Yup.number().typeError('Thời lượng phải là một số').min(0, 'Thời lượng không thể nhỏ hơn 0').required('Thời lượng không được bỏ trống'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentPackage?.name || '',
      description: currentPackage?.description || '',
      activate: currentPackage?.activate || false,
      price: currentPackage?.price || 0,
      duration: currentPackage?.duration || 0,
    }),
    [currentPackage]
  );

  const methods = useForm({
    resolver: yupResolver(NewPackageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentPackage) {
      reset(defaultValues);
    }
  }, [currentPackage, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if(currentPackage) {
        await updatePackage(serviceId, currentPackage.id, data)
      } else {
        await createPackage(serviceId, data)
      }
      reset();
      onClose();
      enqueueSnackbar(currentPackage ? 'Thay đổi thành công!' : 'Tạo thành công!');
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
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentPackage ? 'Chỉnh sửa gói dịch vụ' : 'Tạo gói dịch vụ mới'}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
            <RHFTextField name="name" label="Tên gói dịch vụ" />
            <RHFTextField name="description" label="Miêu tả" />
            <RHFTextField name="price" label="Giá" />
            <RHFTextField name="duration" label="Thời lượng" />
            <RHFCheckbox name="activate" label="Hoạt động" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Huỷ
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentPackage ? 'Cập nhật' : 'Tạo'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

PackageQuickEditForm.propTypes = {
  serviceId: PropTypes.string,
  currentPackage: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
