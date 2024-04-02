import { Grid, Typography } from '@mui/material';
import { UseFormSetValue } from 'react-hook-form';
import { RHFTextField } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';

type IProps = {
  setValue: UseFormSetValue<IHomePage>;
};

const News = ({ setValue }: IProps) => {
  const { t } = useLocales();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('lastNews')}
        </Typography>
      </Grid>

      <Grid container item xs={12} spacing={3}>
        {/* title */}
        <Grid item xs={12} md={12}>
          <RHFTextField name="news.title" label={t('title')} />
        </Grid>
        {/* content */}
        <Grid item xs={12} md={12}>
          <RHFTextField name="news.content" label={t('content')} multiline rows={4} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default News;
