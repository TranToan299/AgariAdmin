import { Box, Card, Grid } from '@mui/material';
import { RHFTextField, RHFUpload } from 'components/hook-form';

import { useLocales } from 'locales';

type Props = {

};

const ContactFormInfo = (props: Props) => {
  const { t } = useLocales();


  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="fullName" isRequired label={t('fullName')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="phoneNumber" isRequired label={t('phoneNumber')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="email" isRequired label={t('email')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="note" label={t('note')} />
          </Grid>
    
        </Grid>
      </Card>
    </Box>
  );
};

export default ContactFormInfo;
