import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';

import Label from 'src/components/label';

import { fData } from 'src/utils/format-number';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createHouseWorker, updateHouseWorker } from 'src/api/house-worker';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,RHFUploadAvatar, RHFSelect
} from 'src/components/hook-form';

import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function HouseWorkerNewEditForm({ currentHouseWorker }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewHouseWorkerSchema = Yup.object().shape({
    name: Yup.string().required('Tên nhân viên không được để trống'),
    username: Yup.string().required('Tên đăng nhập không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
    gender: Yup.string().required('Giới tính không được để trống'),
    age: Yup.number().typeError('Tuổi phải là một số').min(18, 'Tuổi không thể nhỏ hơn 18').required('Tuổi không được bỏ trống'),
    avatar: Yup.mixed().nullable(),
    // not required
  });

  const defaultValues = useMemo(
    () => ({
      name: currentHouseWorker?.name || '',
      username: currentHouseWorker?.username || '',
      password: currentHouseWorker ? 'restrict' : '',
      gender: currentHouseWorker?.gender || 'FEMALE',
      age: currentHouseWorker?.age || '',
      avatar: currentHouseWorker?.avatar ? `${ASSETS_API}/${currentHouseWorker?.avatar}` : null,
    }),
    [currentHouseWorker]
  );

  const methods = useForm({
    resolver: yupResolver(NewHouseWorkerSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentHouseWorker) {
      reset(defaultValues);
    }
  }, [currentHouseWorker, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if(currentHouseWorker) {
        await updateHouseWorker(currentHouseWorker.id, data)
      } else {
        await createHouseWorker(data)
      }
      reset();
      enqueueSnackbar(currentHouseWorker ? 'Thay đổi thành công!' : 'Tạo thành công!');
      router.push(paths.dashboard.houseWorker.root);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatar', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} justifyContent='center'>
      <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Label
              color='warning'
              sx={{ position: 'absolute', top: 24, left: 24, textTransform: 'uppercase' }}
            >
              avatar
            </Label>

            <Box>
              <RHFUploadAvatar
                name="avatar"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Cho phép *.jpeg, *.jpg, *.png
                    <br /> tối đa {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            Thông tin:
          </Typography>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="username" label="Tên đăng nhập" disabled={!!currentHouseWorker} />
              { !currentHouseWorker && (
                <RHFTextField name="password" label="Mật khẩu" />
              )}
              <RHFTextField name="name" label="Họ và Tên" />
              <RHFTextField name="age" label="Tuổi" />
              <RHFSelect
                fullWidth
                name="gender"
                label="Giới tính"
                InputLabelProps={{ shrink: true }}
                PaperPropsSx={{ textTransform: 'capitalize' }}
              >
                {['FEMALE', 'MALE'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option === 'FEMALE' ? 'Nữ' : 'Nam'}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentHouseWorker ? 'Tạo tài khoản' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

HouseWorkerNewEditForm.propTypes = {
  currentHouseWorker: PropTypes.object,
};
