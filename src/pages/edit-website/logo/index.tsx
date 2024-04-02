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
import { CustomFile } from '../../../components/upload';

import { WebcontentType } from '../../../@types/webcontent';
import { getWebcontentPage, updateWebcontent } from '../../../redux/slices/dashboard/webcontent';
import { dispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import BannerHome from '../../../sections/@dashboard/edit-page/banner/BannerHome';
import JobOffer from '../../../sections/@dashboard/edit-page/job-offer/JobOffer';
import Partner from '../../../sections/@dashboard/edit-page/partner/Partner';
import WhyChoosenYou from '../../../sections/@dashboard/edit-page/why-choosen-you/WhyChoosenYou';
import { HomePageSchema } from '../../../utils/schemas';
import { Utils } from '../../../utils/utils';
import LogoSection from '../../../sections/@dashboard/edit-page/logo/LogoSection';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LogoPage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // State
  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  const { logo } = useSelector((state) => state.webcontent);
  //
  const defaultValues: ILogo = {
    id: 0,
    logoHeader: '',
    logoFooter: '',
  };

  const methods = useForm({
    // resolver: yupResolver(HomePageSchema),
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

  const onSubmit = async (data: ILogo) => {
    // handle backgroundUrl banner
    // delete image on s3
    if (listImageDeleted.length) {
      await Utils.deleteFile(listImageDeleted[0]);
      // listImageDeleted.forEach(async (item) => {
      //   const res = await Utils.deleteFile(item);
      //   console.log('🚀 ~ file: index.tsx:126 ~ listImageDeleted.forEach ~ res:', res);
      // });
    }
    const logoHeaderUrl =
      typeof data.logoHeader !== 'string' ? await uploadImage(data.logoHeader) : data.logoHeader;
    if (logoHeaderUrl) {
      data.logoHeader = logoHeaderUrl;
    }

    const logoFooterUrl =
      typeof data.logoFooter !== 'string' ? await uploadImage(data.logoFooter) : data.logoFooter;
    if (logoFooterUrl) {
      data.logoFooter = logoFooterUrl;
    }

    const content = JSON.stringify(data);
    const dataSubmit = {
      id: data.id ?? 0,
      type: WebcontentType.Logo,
      content,
    };
    dispatch(updateWebcontent(dataSubmit));
  };

  const values = watch();

  useEffect(() => {
    if (logo) {
      const data: IContactPage = JSON.parse(logo[0].content);
      reset({ ...data, id: logo[0].id });
    } else {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo]);

  useEffect(() => {
    if (!logo) {
      dispatch(getWebcontentPage(WebcontentType.Logo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('editLogo')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editLogo')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('editPage'), href: PATH_DASHBOARD.app.editWebsite.root },
              { name: t('logo') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <LogoSection
              currentHeaderUrl={values.logoHeader}
              currentFooterUrl={values.logoFooter}
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
