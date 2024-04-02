import { Grid, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { RHFTextField, RHFUpload } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';

type IProps = {
  setValue: UseFormSetValue<IHomePage>;
  listImageDeleted: string[];
  setListImageDeleted: React.Dispatch<React.SetStateAction<string[]>>;
  currentBackgroundUrl: string | File;
};

const WhyChoosenYou = ({
  setValue,
  listImageDeleted,
  setListImageDeleted,
  currentBackgroundUrl,
}: IProps) => {
  const { t } = useLocales();

  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      /**
       * Handle when drop single file
       */

      if (typeof currentBackgroundUrl === 'string')
        setListImageDeleted([...listImageDeleted, currentBackgroundUrl]);
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const urlFile = file;
      if (newFile) {
        setValue('whyChooseUs.image', urlFile, { shouldValidate: true });
      }
    },
    [setValue, listImageDeleted, currentBackgroundUrl, setListImageDeleted]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('whyChoosenYou')}
        </Typography>
      </Grid>
      <Grid container item xs={12} md={6}>
        {/* Images */}
        <Grid item xs={12}>
          <RHFUpload
            thumbnail
            name="whyChooseUs.image"
            onDrop={(acceptedFiles: File[]) => handleDropSingleFile(acceptedFiles)}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} spacing={3}>
        {/* title */}
        <Grid item xs={12}>
          <RHFTextField name="whyChooseUs.title" label={t('title')} />
        </Grid>
        {/* content */}
        <Grid item xs={12}>
          <RHFTextField name="whyChooseUs.subtitle" label={t('subtitle')} multiline rows={4} />
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="whyChooseUs.content[0].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="whyChooseUs.content[0].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="whyChooseUs.content[1].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="whyChooseUs.content[1].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="whyChooseUs.content[2].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="whyChooseUs.content[2].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="whyChooseUs.content[3].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="whyChooseUs.content[3].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WhyChoosenYou;
