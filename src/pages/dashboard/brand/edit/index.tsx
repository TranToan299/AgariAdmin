import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateBrandForm } from 'sections/@dashboard/brand/create';

// ----------------------------------------------------------------------

export default function EditBrandPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
    <PageWrapper title={t('editBrand')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('editBrand')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('brand'), href: PATH_DASHBOARD.app.brand.brand },
            { name: t('edit') },
          ]}
        />
        <CreateBrandForm isEdit />
      </Container>
    </PageWrapper>
  );
}
