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
import BannerContact from '../../../sections/@dashboard/edit-page/banner/BannerContact';
import { ContactPageSchema } from '../../../utils/schemas';
import { Utils } from '../../../utils/utils';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ContactPage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // State
  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  const { contact } = useSelector((state) => state.webcontent);
  //
  const defaultValues: IContactPage = {
    id: 0,
    banner: {
      title: '',
      content: '',
      backgroundUrl: '',
    },
    feedback: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactPageSchema),
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

  const onSubmit = async (data: IContactPage) => {
    // handle backgroundUrl banner
    // delete image on s3
    if (listImageDeleted.length) {
      await Utils.deleteFile(listImageDeleted[0]);
      // listImageDeleted.forEach(async (item) => {
      //   const res = await Utils.deleteFile(item);
      //   console.log('🚀 ~ file: index.tsx:126 ~ listImageDeleted.forEach ~ res:', res);
      // });
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
      type: WebcontentType.Contact,
      content,
    };
    dispatch(updateWebcontent(dataSubmit));
  };

  const values = watch();

  useEffect(() => {
    if (contact) {
      const data: IContactPage = JSON.parse(contact[0].content);
      reset({ ...data, id: contact[0].id });
    } else {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  useEffect(() => {
    if (!contact) {
      dispatch(getWebcontentPage(WebcontentType.Contact));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('editContactPage')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editContactPage')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('editPage'), href: PATH_DASHBOARD.app.editWebsite.root },
              { name: t('Contact') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <BannerContact
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
