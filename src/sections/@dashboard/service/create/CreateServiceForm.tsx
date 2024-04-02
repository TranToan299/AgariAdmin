import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Utils } from 'utils/utils';
import { serviceSchema } from 'utils/schemas';
import { dispatch, useSelector } from 'redux/store';
import { createService, getDetail } from 'redux/slices/dashboard/services';
import { useLocales } from 'locales';
import { EVENT_TYPE, dirNameS3 } from 'constants/app.constants';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import ServiceFormInfo from './ServiceFormInfo';
import { IService } from '../../../../@types/service';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateServiceForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { serviceDetail } = useSelector((state) => state.service);
  const [editValue, setEditValue] = useState('');
  const { t } = useLocales();
  const defaultValues = useMemo(() => {
    return {
      name: '',
      thumbnail: null,
      description: '',
      isPublish: false,
    };
  }, []);

  const methods = useForm<IService>({
    resolver: yupResolver(serviceSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: IService) => {
    const submitData = {
      ...data,
      id: params.id ?? 0,
      type: EVENT_TYPE.SERVICE,
      thumbnail: await Utils.checkUrl(data.thumbnail, dirNameS3.service, 'thumbnail'),
      content: editValue,
    };
    await dispatch(createService(submitData));
    await navigate(PATH_DASHBOARD.app.service.service);
  };

  useEffect(() => {
    if (params.id) {
      reset(serviceDetail);
      setEditValue(serviceDetail.content ?? '');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceDetail]);

  useEffect(() => {
    if (params.id) {
      dispatch(getDetail(params.id));
    }
  }, [params.id]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <ServiceFormInfo editValue={editValue} setEditValue={setEditValue} methods={methods} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.service.service)}
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
