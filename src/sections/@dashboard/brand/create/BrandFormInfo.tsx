import { Box, Card, Grid } from '@mui/material';
import { RHFTextField } from 'components/hook-form';

import { useLocales } from 'locales';

type Props = {};
const BrandFormInfo = (props: Props) => {
  const { t } = useLocales();

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="objectCode" label={t('brandCode')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="objectName" label={t('brandName')} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default BrandFormInfo;
