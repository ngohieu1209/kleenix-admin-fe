import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useMemo, useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Label from 'src/components/label';

import { fData } from 'src/utils/format-number';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { createPromotion, updatePromotion } from 'src/api/promotion';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,RHFUploadAvatar, RHFCheckbox
} from 'src/components/hook-form';

import { ASSETS_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function PromotionNewEditForm({ promotion }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewPromotionSchema = Yup.object().shape({
    name: Yup.string().required('Tên khuyến mãi không được để trống'),
    activate: Yup.boolean().default(false),
    image: Yup.mixed().nullable().required('Image không được để trống'),
    amount: Yup.number().typeError('Số lượng phải là một số').min(1, 'Số lượng không thể nhỏ hơn 1').required('Số lượng không được bỏ trống'),
    point: Yup.number().typeError('Điểm phải là một số').min(0, 'Điểm không thể nhỏ hơn 0').required('Điểm không được bỏ trống'),
    discount: Yup.number().typeError('Giảm giá phải là một số').min(10000, 'Giảm giá không thể nhỏ hơn 10.000').required('Giảm giá không được bỏ trống'),
    startTime: Yup.mixed().nullable().required('Thời gian bắt đầu không được bỏ trống'),
    endTime: Yup.mixed()
      .required('Thời gian kết thúc không được bỏ trống')
      .test(
        'date-min',
        'Thời gian kết thúc phải sau thời gian bắt đầu',
        (value, { parent }) => value.getTime() > parent.startTime.getTime()
      ),
    // not required
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: promotion?.name || '',
      activate: promotion?.activate || false,
      image: promotion?.image ? `${ASSETS_API}/${promotion?.image}` : null,
      description: promotion?.description || '',
      amount: promotion?.amount || 1,
      discount: promotion?.discount || 0,
      point: promotion?.point || 0,
      startTime: promotion?.startTime ? new Date(promotion.startTime) : new Date(),
      endTime: promotion?.endTime ? new Date(promotion.endTime) : null,
    }),
    [promotion]
  );

  const methods = useForm({
    resolver: yupResolver(NewPromotionSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (promotion) {
      reset(defaultValues);
    }
  }, [promotion, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if(promotion) {
        await updatePromotion(promotion.id, data)
      } else {
        await createPromotion(data)
      }
      reset();
      enqueueSnackbar(promotion ? 'Thay đổi thành công!' : 'Tạo thành công!');
      router.push(paths.dashboard.promotion.root);
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
        setValue('image', newFile, { shouldValidate: true });
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
              image
            </Label>

            <Box>
              <RHFUploadAvatar
                name="image"
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
              <RHFTextField name="name" label="Tên khuyến mãi" />
              <RHFTextField name="description" label="Miêu tả"/>

              { promotion ? (
                <RHFCheckbox
                  name="activate"
                  label="Hoạt động"
                />
              ) : (
                <>

                  <RHFTextField name="discount" label="Giảm giá" />
                  <RHFTextField name="point" label="Điểm" />
                  <RHFTextField name="amount" label="Số lượng" />
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    columnGap={3}
                  >
                    <Controller
                      name="startTime"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          label="Thời gian bắt đầu"
                          value={field.value}
                          onChange={(newValue) => {
                            field.onChange(newValue);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!error,
                              helperText: error?.message,
                            },
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="endTime"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          label="Thời gian kết thúc"
                          value={field.value}
                          onChange={(newValue) => {
                            field.onChange(newValue);
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!error,
                              helperText: error?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </>
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!promotion ? 'Tạo khuyến mãi' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

PromotionNewEditForm.propTypes = {
  promotion: PropTypes.object,
};
