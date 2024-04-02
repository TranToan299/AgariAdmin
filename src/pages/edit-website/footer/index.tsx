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
import FooterSection from '../../../sections/@dashboard/edit-page/footer/FooterSection';
import { FooterPageSchema } from '../../../utils/schemas';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function FooterPage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // State
  const [editValue, setEditValue] = useState<string>('');

  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  const { footer } = useSelector((state) => state.webcontent);
  //
  const defaultValues: IFooterPage = {
    id: 0,
    address: '',
    linkFacebook: '',
    linkTiktok: '',
    linkZalo: '',
  };

  const methods = useForm({
    resolver: yupResolver(FooterPageSchema),
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

  const onSubmit = async (data: IFooterPage) => {
    data.address = editValue;
    const content = JSON.stringify(data);
    const dataSubmit = {
      id: data.id ?? 0,
      type: WebcontentType.Footer,
      content,
    };
    dispatch(updateWebcontent(dataSubmit));
  };

  const values = watch();

  useEffect(() => {
    if (footer) {
      const data: IFooterPage = JSON.parse(footer[0].content);
      reset({ ...data, id: footer[0].id });
      setEditValue(data.address);
    } else {
      reset(defaultValues);
      setEditValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footer]);

  useEffect(() => {
    if (!footer) {
      dispatch(getWebcontentPage(WebcontentType.Footer));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('editFooter')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editFooter')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('editPage'), href: PATH_DASHBOARD.app.editWebsite.root },
              { name: t('footer') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <FooterSection editValue={editValue} setEditValue={setEditValue} />
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
