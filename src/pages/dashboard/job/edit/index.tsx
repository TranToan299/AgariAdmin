import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateJobForm } from '../../../../sections/@dashboard/job/create';

// ----------------------------------------------------------------------

export default function EditProductPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();



  return (
      <PageWrapper title={t('editJob')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editJob')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('job'), href: PATH_DASHBOARD.app.job.job },
              { name: t('edit') },
            ]}
          />
          <CreateJobForm isEdit />
        </Container>
      </PageWrapper>
  );
}
