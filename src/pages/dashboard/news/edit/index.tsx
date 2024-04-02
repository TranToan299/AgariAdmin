import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateNewsForm } from 'sections/@dashboard/news/create';

// ----------------------------------------------------------------------

export default function EditNewsPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();



  return (
      <PageWrapper title={t('editNews')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('editNews')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('news'), href: PATH_DASHBOARD.app.news.news },
              { name: t('edit') },
            ]}
          />
          <CreateNewsForm isEdit />
        </Container>
      </PageWrapper>
  );
}
