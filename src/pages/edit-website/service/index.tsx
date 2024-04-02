import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useTheme } from '@mui/system';
import PageWrapper from 'components/page-wrapper';
import { useLocales } from 'locales';
import { useForm } from 'react-hook-form';

import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import FormProvider from '../../../components/hook-form/FormProvider';
// import { RHFUploadV2 } from '../../../components/hook-form/RHFUploadV2';
import { useSettingsContext } from '../../../components/settings';

import { WebcontentType } from '../../../@types/webcontent';
import { getWebcontentPage, updateWebcontent } from '../../../redux/slices/dashboard/webcontent';
import { dispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import BannerCarrer from '../../../sections/@dashboard/edit-page/banner/BannerCarrer';
import { CarrerPageSchema, ServicePageSchema } from '../../../utils/schemas';
import { Utils } from '../../../utils/utils';
import BannerService from '../../../sections/@dashboard/edit-page/banner/BannerService';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ServicePage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // State
  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  const { service } = useSelector((state) => state.webcontent);
  //
  const defaultValues: IServicePage = {
    id: 0,
    banner: {
      title: '',
      content: '',
      backgroundUrl: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(ServicePageSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const uploadImage = async (file: File) => {
    const url = await Utils.uploadFile(file, 'images');
    return url;
  };

  const onSubmit = async (data: IServicePage) => {
    // handle backgroundUrl banner
    // delete image on s3
    if (listImageDeleted.length) {
      await Utils.deleteFile(listImageDeleted[0]);
    }
    const backgroundUrl =
      typeof data.banner.backgroundUrl !== 'string'
        ? await uploadImage(data.banner.backgroundUrl)
        : data.banner.backgroundUrl;
    if (backgroundUrl) {
      data.banner.backgroundUrl = backgroundUrl;
    }

    const content = JSON.stringify(data);
    const dataSubmit = {
      id: data.id ?? 0,
      type: WebcontentType.Service,
      content,
    };
    dispatch(updateWebcontent(dataSubmit));
  };

  const values = watch();

  useEffect(() => {
    if (service) {
      const data: IServicePage = JSON.parse(service[0].content);
      reset({ ...data, id: service[0].id });
    } else {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    if (!service) {
      dispatch(getWebcontentPage(WebcontentType.Service));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('editServicePage')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editServicePage')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('editPage'), href: PATH_DASHBOARD.app.editWebsite.root },
              { name: t('Service') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <BannerService
              currentBackgroundUrl={values.banner?.backgroundUrl}
              setValue={setValue}
              listImageDeleted={listImageDeleted}
              setListImageDeleted={setListImageDeleted}
            />
          </Card>
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton type="submit" variant="outlined">
                  {t('back')}
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {t('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Container>
      </PageWrapper>
    </FormProvider>
  );
}
