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

import { yupResolver } from '@hookform/resolvers/yup';
import { WebcontentType } from '../../../@types/webcontent';
import { getWebcontentPage, updateWebcontent } from '../../../redux/slices/dashboard/webcontent';
import { dispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import AboutUs from '../../../sections/@dashboard/edit-page/about-us/AboutUs';
import BannerAbout from '../../../sections/@dashboard/edit-page/banner/BannerAbout';
import OurTeam from '../../../sections/@dashboard/edit-page/our-team/OurTeam';
import { AboutPageSchema } from '../../../utils/schemas';
import { Utils } from '../../../utils/utils';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AboutPage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // State
  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  const { about } = useSelector((state) => state.webcontent);
  //
  const defaultValues: IAboutPage = {
    id: 0,
    banner: {
      title: '',
      content: '',
      backgroundUrl: '',
    },
    aboutUs: {
      title: '',
      content: '',
      backgroundUrl: '',
    },
    ourTeam: {
      title: '',
      content: '',
      listImageUrl: [],
    },
  };

  const methods = useForm({
    resolver: yupResolver(AboutPageSchema),
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

  const convertImageHandle = async (data: (string | CustomFile)[]) => {
    // handle upload file to server
    const listPromise: Promise<string | null>[] = [];
    data.forEach(async (image: string | CustomFile) => {
      if (typeof image !== 'string') {
        listPromise.push(uploadImage(image));
      }
    });
    const listImage = await Promise.all(listPromise);
    const imagesArr = [...data.filter((item) => typeof item === 'string'), ...listImage];

    // // change array to string join ','
    // const images = imagesArr.join(',');
    return imagesArr;
  };

  const uploadImage = async (file: File) => {
    const url = await Utils.uploadFile(file, 'images');
    return url;
  };

  const onSubmit = async (data: IAboutPage) => {
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

    // handle image aboutUs
    const imageAboutUs =
      typeof data.aboutUs.backgroundUrl !== 'string'
        ? await uploadImage(data.aboutUs.backgroundUrl)
        : data.aboutUs.backgroundUrl;
    if (imageAboutUs) {
      data.aboutUs.backgroundUrl = imageAboutUs;
    }

    // handle listImageUrl ourTeam
    const listImageUrl: any = await convertImageHandle(data.ourTeam.listImageUrl);
    // convert from array to array string

    if (listImageUrl && listImageUrl.length) data.ourTeam.listImageUrl = listImageUrl;

    const content = JSON.stringify(data);
    const dataSubmit = {
      id: data.id ?? 0,
      type: WebcontentType.About,
      content,
    };
    dispatch(updateWebcontent(dataSubmit));
  };

  const values = watch();

  useEffect(() => {
    if (about) {
      const data: IAboutPage = JSON.parse(about[0].content);
      reset({ ...data, id: about[0].id });
    } else {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [about]);

  useEffect(() => {
    if (!about) {
      dispatch(getWebcontentPage(WebcontentType.About));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('editAboutPage')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editAboutPage')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('editPage'), href: PATH_DASHBOARD.app.editWebsite.home },
              { name: t('About') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <BannerAbout
              currentBackgroundUrl={values.banner?.backgroundUrl}
              setValue={setValue}
              listImageDeleted={listImageDeleted}
              setListImageDeleted={setListImageDeleted}
            />
          </Card>
          <Card sx={{ mt: 3, p: 3 }}>
            <AboutUs
              currentBackgroundUrl={values.aboutUs?.backgroundUrl}
              setValue={setValue}
              listImageDeleted={listImageDeleted}
              setListImageDeleted={setListImageDeleted}
            />
          </Card>

          <Card sx={{ mt: 3, p: 3 }}>
            <OurTeam
              setValue={setValue}
              values={values}
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
