
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
import { careerSchema } from 'utils/schemas';
import { DEFAULT_PAGINATION, OBJECT_TYPE } from 'constants/app.constants';
import { ICareer } from '../../../../@types/job';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import JobFormInfo from './JobFormInfo';
// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateJobForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useLocales();
  // useSelector
  const { careerDetail } = useSelector((state) => state.career);
  const { provinceList } = useSelector((state) => state.province);

  // useState
  const [getDone, setGetDone] = useState<boolean>(false);
  const [editValue, setEditValue] = useState('');

  const defaultValues = useMemo(() => {
    return {
      brand_id: '',
      province_id: null,
      name: '',
      field: '',
      jobType: '',
      description: '',
      jobsOutstanding:false,
      isPublish: false,
      isHighlight: false,
    };
  }, []);

  const methods = useForm<ICareer>({
    resolver: yupResolver(careerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: ICareer) => {
    const submitData = {
      ...data,
      id: params.id ?? 0,
      content: editValue,
      province_id: data.province_id.value,
    };
    console.log(submitData);
    await dispatch(createCareer(submitData));
    await navigate(PATH_DASHBOARD.app.job.job);
  };

  // useEffect
  // Lấy danh sách Brand và Province trước khi reset data
  const getList = async () => {
    await dispatch(
      getProvinceList({
        pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
        pageSize: DEFAULT_PAGINATION.GET_ALL,
      })
    );
    await dispatch(
      getBrandList({
        objectType: OBJECT_TYPE.brand,
      })
    );
    await setGetDone(true);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    const currentProvince = provinceList.find((item) => {
      return item.id === careerDetail.province_id;
    });
    console.log(currentProvince);
    if (isEdit) {
      reset({
        ...careerDetail,
        province_id: {
          label: `${currentProvince?.code} - ${currentProvince?.name}`,
          value: currentProvince?.id,
        },
      });
      setEditValue(careerDetail.content ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [careerDetail]);

  useEffect(() => {
    if (params.id && getDone) {
      dispatch(getDetailCareer(params.id));
    }
  }, [params, getDone]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <JobFormInfo editValue={editValue} setEditValue={setEditValue} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.job.job)}
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
