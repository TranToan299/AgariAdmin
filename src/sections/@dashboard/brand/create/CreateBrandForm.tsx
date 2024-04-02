import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createCareer, getDetailCareer } from 'redux/slices/dashboard/career';
import { getBrandList } from 'redux/slices/dashboard/objectType';
import { useLocales } from 'locales';
import { getProvinceList } from 'redux/slices/dashboard/province';
import { dispatch, useSelector } from 'redux/store';
import { brandSchema, careerSchema } from 'utils/schemas';
import { DEFAULT_PAGINATION, OBJECT_TYPE } from 'constants/app.constants';
import { ICareer } from '../../../../@types/job';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import BrandFormInfo from './BrandFormInfo';
import { BrandCreateRequest, BrandModal } from '../../../../@types/brand.model';
import brandApi from 'apis/brand.api';
import { createBrand, getBrandDetail } from 'redux/slices/dashboard/brand';
// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

interface FormProps {
  objectName: string;
  objectCode: string | number;
}

export default function CreateBrandForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useLocales();
  // useSelector
  const { brandDetail } = useSelector((state) => state.brand);
  console.log(brandDetail);
  // useState
  const defaultValues = useMemo(() => {
    return {
      objectCode: '',
      objectName: '',
    };
  }, []);

  const methods = useForm<FormProps>({
    resolver: yupResolver(brandSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormProps) => {
    const request: BrandCreateRequest = {
      ...data,
      id: params.id ?? 0,
    };
    await dispatch(createBrand(request));
    await navigate(PATH_DASHBOARD.app.brand.brand);
  };

  async function getDetailBrand(id: string) {
    await dispatch(getBrandDetail(id));
  }

  // useEffect
  useEffect(() => {
    if (params.id && brandDetail) {
      reset(brandDetail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandDetail]);
  useEffect(() => {
    if (params.id) {
      getDetailBrand(params.id);
    }
  }, [params.id]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <BrandFormInfo />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.brand.brand)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? t('create') : t('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
