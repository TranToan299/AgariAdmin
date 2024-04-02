import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateContactForm } from 'sections/@dashboard/contact/create';
import { CreateJobApplyForm } from 'sections/@dashboard/jobApply/create';

// ----------------------------------------------------------------------

export default function CreateJobApplyPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
    <PageWrapper title={t('createJobApply')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('createJobApply')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('jobApply'), href: PATH_DASHBOARD.app.job.apply },
            { name: t('create') },
          ]}
        />
        <CreateJobApplyForm/>
      </Container>
    </PageWrapper>
  );
}
