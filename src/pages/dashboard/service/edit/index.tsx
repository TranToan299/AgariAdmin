import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateServiceForm } from '../../../../sections/@dashboard/service/create';

// ----------------------------------------------------------------------

export default function EditServicePage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
    <PageWrapper title={t('editService')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('editService')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('service'), href: PATH_DASHBOARD.app.service.service },
            { name: t('edit') },
          ]}
        />
        <CreateServiceForm isEdit />
      </Container>
    </PageWrapper>
  );
}
