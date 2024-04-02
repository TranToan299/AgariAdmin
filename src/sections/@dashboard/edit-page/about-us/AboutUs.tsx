import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { RHFTextField, RHFUpload } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';
import { CustomFile } from '../../../../components/upload';

type IProps = {
  setValue: UseFormSetValue<IAboutPage>;
  listImageDeleted: string[];
  setListImageDeleted: React.Dispatch<React.SetStateAction<string[]>>;
  currentBackgroundUrl: string | File;
};

const AboutUs = ({
  setValue,
  listImageDeleted,
  setListImageDeleted,
  currentBackgroundUrl,
}: IProps) => {
  const { t } = useLocales();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;

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
        setValue('aboutUs.backgroundUrl', urlFile, { shouldValidate: true });
      }
    },
    [setValue, listImageDeleted, currentBackgroundUrl, setListImageDeleted]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('aboutUs')}
        </Typography>
      </Grid>
      {/* title */}
      <Grid item xs={12}>
        <RHFTextField name="aboutUs.title" label={t('title')} />
      </Grid>
      {/* content */}
      <Grid item xs={12}>
        <RHFTextField name="aboutUs.content" label={t('content')} multiline rows={4} />
      </Grid>

      {/* Images */}
      <Grid item xs={12}>
        <RHFUpload
          thumbnail
          name="aboutUs.backgroundUrl"
          onDrop={(acceptedFiles: File[]) => handleDropSingleFile(acceptedFiles)}
        />
      </Grid>
    </Grid>
  );
};

export default AboutUs;
