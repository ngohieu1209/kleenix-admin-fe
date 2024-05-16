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

import Label from 'src/components/label';

import { fData } from 'src/utils/format-number';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createService, updateService } from 'src/api/service';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,RHFUploadAvatar, RHFCheckbox
} from 'src/components/hook-form';

import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function ServiceNewEditForm({ currentService }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewServiceSchema = Yup.object().shape({
    name: Yup.string().required('Tên dịch vụ không được để trống'),
    activate: Yup.boolean().default(false),
    icon: Yup.mixed().nullable().required('Icon không được để trống'),
    // not required
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentService?.name || '',
      activate: currentService?.activate || false,
      icon: currentService?.icon ? `${ASSETS_API}/${currentService?.icon}` : null,
      description: currentService?.description || '',
    }),
    [currentService]
  );

  const methods = useForm({
    resolver: yupResolver(NewServiceSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentService) {
      reset(defaultValues);
    }
  }, [currentService, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if(currentService) {
        await updateService(currentService.id, data)
      } else {
        await createService(data)
      }
      reset();
      enqueueSnackbar(currentService ? 'Thay đổi thành công!' : 'Tạo thành công!');
      router.push(paths.dashboard.service.root);
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
        setValue('icon', newFile, { shouldValidate: true });
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
              icon
            </Label>

            <Box>
              <RHFUploadAvatar
                name="icon"
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
              <RHFTextField name="name" label="Tên dịch vụ" />
              <RHFTextField name="description" label="Miêu tả"/>
              { currentService && (
                <RHFCheckbox
                  name="activate"
                  label="Hoạt động"
                />
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentService ? 'Tạo dịch vụ' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ServiceNewEditForm.propTypes = {
  currentService: PropTypes.object,
};
