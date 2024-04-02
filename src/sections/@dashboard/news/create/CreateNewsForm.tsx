import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocales } from 'locales';
import { EVENT_TYPE, dirNameS3 } from 'constants/app.constants';
import { createNews, getDetail } from 'redux/slices/dashboard/news';
import { dispatch, useSelector } from 'redux/store';
import { newsSchema } from 'utils/schemas';
import { Utils } from 'utils/utils';
import { INewsType } from '../../../../@types/news';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import NewsFromInfo from './NewsFromInfo';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  initValue?: any;
};

export default function CreateNewsForm({ isEdit = false, initValue }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { newsDetail } = useSelector((state) => state.news);
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

  const methods = useForm<INewsType>({
    resolver: yupResolver(newsSchema),
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

  const onSubmit = async (data: INewsType) => {
    const submitData = {
      ...data,
      id: params.id ?? 0,
      type: EVENT_TYPE.NEWS,
      thumbnail: await Utils.checkUrl(data.thumbnail, dirNameS3.news, 'thumbnail'),
      content: editValue,
    };
    await dispatch(createNews(submitData));
    await navigate(PATH_DASHBOARD.app.news.news);
  };

  useEffect(() => {
    if (params.id) {
      reset(newsDetail);
      setEditValue(newsDetail.content ?? '');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsDetail]);

  useEffect(() => {
    if (params.id) {
      dispatch(getDetail(params.id));
    }
  }, [params.id]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <NewsFromInfo editValue={editValue} setEditValue={setEditValue} methods={methods} />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.news.news)}
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
