import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { DEFAULT_PAGINATION, dirNameS3 } from 'constants/app.constants';
import { useLocales } from 'locales';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postApplyCareer } from 'redux/slices/dashboard/apply-careers';
import { getDistrictList } from 'redux/slices/dashboard/district';
import { getProvinceList } from 'redux/slices/dashboard/province';
import { dispatch } from 'redux/store';
import { careerApplySchema } from 'utils/schemas';
import { Utils } from 'utils/utils';
import { ApplyCareer } from '../../../../@types/applyCareer';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import JobApplyFormInfo from './JobApplyFormInfo';

// ----------------------------------------------------------------------

type Props = {};

export default function CreateJobApplyForm(props: Props) {
  const navigate = useNavigate();
  const [fileAccept, setFileAccept] = useState<File | string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const { t } = useLocales();
  const defaultValues = {
    fullName: '',
    phoneNumber: '',
    dateOfBirth: new Date(),
    experience: '',
    career_id: null,
    district_id: null,
    province_id: null,
  };

  const methods = useForm<ApplyCareer>({
    resolver: yupResolver(careerApplySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;
  const province = watch('province_id');

  const onSubmit = async (data: ApplyCareer) => {
    const fileUrl = await Utils.uploadFile(fileAccept, dirNameS3.applyCareer, t('jobApply'));
    const submitValues = {
      ...data,
      url: fileUrl,
      province_id: data.province_id.value,
      district_id: data.district_id.value,
      career_id: data.career_id.value,
    };
    await dispatch(postApplyCareer(submitValues));
    await navigate(PATH_DASHBOARD.app.job.apply);
  };

  const handleChangeProvince = async () => {
    if (province) {
      await dispatch(
        getDistrictList({
          provinceId: province.value,
          pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
          pageSize: DEFAULT_PAGINATION.GET_ALL,
        })
      );
    }
  };

  useEffect(() => {
    if (fileAccept) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fileAccept]);

  useEffect(() => {
    dispatch(
      getProvinceList({
        pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
        pageSize: DEFAULT_PAGINATION.GET_ALL,
      })
    );
  }, []);
  useEffect(() => {
    setValue('district_id', null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <JobApplyFormInfo
            province={province}
            handleChangeProvince={handleChangeProvince}
            fileUrl={fileAccept}
            setFileUrl={setFileAccept}
          />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.job.apply)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>
                <LoadingButton
                  disabled={disabled}
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {t('create')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
