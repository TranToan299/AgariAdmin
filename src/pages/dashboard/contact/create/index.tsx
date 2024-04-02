import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateContactForm } from 'sections/@dashboard/contact/create';

// ----------------------------------------------------------------------

export default function CreateContactPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
    <PageWrapper title={t('createContact')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('createContact')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('contact'), href: PATH_DASHBOARD.app.contact.contact },
            { name: t('create') },
          ]}
        />
        <CreateContactForm />
      </Container>
    </PageWrapper>
  );
}
