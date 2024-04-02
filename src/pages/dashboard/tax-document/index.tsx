import { LoadingButton } from '@mui/lab';
import { Box, Card, Container, Grid, Stack } from '@mui/material';
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

import { IEventCommon } from '../../../@types/taxDocument';
import TextEditor from '../../../components/common/TextEditor';
import { ID_EVENT, TYPE_EVENT } from '../../../constants/app.constants';
import { getEvent, updateEvent } from '../../../redux/slices/dashboard/event';
import { dispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TaxDocumentPage() {
  const { t } = useLocales();
  const navigate = useNavigate();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // State
  const [editValue, setEditValue] = useState('');
  const { event } = useSelector((state) => state.event);
  //
  const defaultValues: IEventCommon = {
    id: 0,
    content: '',
    type: TYPE_EVENT.TaxDocument,
  };

  const methods = useForm({
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

  const onSubmit = async (data: IEventCommon) => {
    const dataSubmit = {
      ...data,
      content: editValue,
    };
    await dispatch(updateEvent(dataSubmit));
    await dispatch(getEvent(ID_EVENT.TaxDocument));
  };

  useEffect(() => {
    if (event) {
      reset(event);
      setEditValue(event.content);
    } else {
      reset(defaultValues);
      setEditValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  useEffect(() => {
    dispatch(getEvent(ID_EVENT.TaxDocument));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('taxDocument')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('taxDocument')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('taxDocument'), href: PATH_DASHBOARD.app.taxDocument.root },
              { name: t('edit') },
            ]}
          />

          <Card sx={{ mt: 3, p: 3 }}>
            <Grid container spacing={3}>
              <TextEditor initValue={editValue} setEditorValue={setEditValue} />
            </Grid>
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
