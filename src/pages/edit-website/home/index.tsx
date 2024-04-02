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
import News from '../../../sections/@dashboard/edit-page/news/News';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomePage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();
  const { home } = useSelector((state) => state.webcontent);

  // State
  const [editValue, setEditValue] = useState<string>('');

  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  //
  const defaultValues: IHomePage = {
    id: 0,
    banner: {
      title: '',
      content: '',
      backgroundUrl: '',
    },
    whyChooseUs: {
      title: '',
      subtitle: '',
      content: [
        {
          title: '',
          content: '',
        },
      ],
      image: '',
    },
    news: {
      content: '',
      title: '',
    },
    jobOffer: {
      title: '',
      subtitle: '',
      content: [
        {
          title: '',
          content: '',
        },
      ],
      image: '',
      outstandingJobId: {
        value: 0,
        label: '',
      },
    },
    partner: [],
  };

  const methods = useForm({
    resolver: yupResolver(HomePageSchema),
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

  const onSubmit = async (data: IHomePage) => {
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

    // handle image whyChooseUs
    const imageWhyChooseUs =
      typeof data.whyChooseUs.image !== 'string'
        ? await uploadImage(data.whyChooseUs.image)
        : data.whyChooseUs.image;
    if (imageWhyChooseUs) {
      data.whyChooseUs.image = imageWhyChooseUs;
    }

    // handle image jobOffer
    const imageJobOffer =
      typeof data.jobOffer.image !== 'string'
        ? await uploadImage(data.jobOffer.image)
        : data.jobOffer.image;
    if (imageJobOffer) {
      data.jobOffer.image = imageJobOffer;
    }

    // handle image partner
    const partner: any = await convertImageHandle(data.partner);
    // convert from array to array string

    if (partner && partner.length) data.partner = partner;
    data.jobOffer.subtitle = editValue;

    const content = JSON.stringify(data);
    const dataSubmit = {
      id: data.id ?? 0,
      type: WebcontentType.Home,
      content,
    };
    dispatch(updateWebcontent(dataSubmit));
  };

  const values = watch();

  useEffect(() => {
    if (home) {
      const data: IHomePage = JSON.parse(home[0].content);
      reset({ ...data, id: home[0].id });
      setEditValue(data.jobOffer.subtitle);
    } else {
      reset(defaultValues);
      setEditValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [home]);

  useEffect(() => {
    if (!home) {
      dispatch(getWebcontentPage(WebcontentType.Home));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('editHomePage')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editHomePage')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('editPage'), href: PATH_DASHBOARD.app.editWebsite.home },
              { name: t('Home') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <BannerHome
              currentBackgroundUrl={values.banner?.backgroundUrl}
              setValue={setValue}
              listImageDeleted={listImageDeleted}
              setListImageDeleted={setListImageDeleted}
            />
          </Card>
          <Card sx={{ mt: 3, p: 3 }}>
            <WhyChoosenYou
              setValue={setValue}
              listImageDeleted={listImageDeleted}
              setListImageDeleted={setListImageDeleted}
              currentBackgroundUrl={values.whyChooseUs.image}
            />
          </Card>
          <Card sx={{ mt: 3, p: 3 }}>
            <JobOffer
              setValue={setValue}
              listImageDeleted={listImageDeleted}
              setListImageDeleted={setListImageDeleted}
              currentBackgroundUrl={values.jobOffer.image}
              editValue={editValue}
              setEditValue={setEditValue}
            />
          </Card>
          <Card sx={{ mt: 3, p: 3 }}>
            <News setValue={setValue} />
          </Card>
          <Card sx={{ mt: 3, p: 3 }}>
            <Partner
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
