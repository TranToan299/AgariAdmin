import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { RHFUpload } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';

type IProps = {
  setValue: UseFormSetValue<ILogo>;
  listImageDeleted: string[];
  setListImageDeleted: React.Dispatch<React.SetStateAction<string[]>>;
  currentHeaderUrl: string | File;
  currentFooterUrl: string | File;
};

const LogoSection = ({
  setValue,
  listImageDeleted,
  setListImageDeleted,
  currentHeaderUrl,
  currentFooterUrl,
}: IProps) => {
  const { t } = useLocales();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;

  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      /**
       * Handle when drop single file
       */
      if (typeof currentHeaderUrl === 'string')
        setListImageDeleted([...listImageDeleted, currentHeaderUrl]);
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const urlFile = file;
      if (newFile) {
        setValue('logoHeader', urlFile, { shouldValidate: true });
      }
    },
    [setValue, listImageDeleted, currentHeaderUrl, setListImageDeleted]
  );
  const handleDropSingleFileFooter = useCallback(
    async (acceptedFiles: File[]) => {
      /**
       * Handle when drop single file
       */
      if (typeof currentFooterUrl === 'string')
        setListImageDeleted([...listImageDeleted, currentFooterUrl]);
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const urlFile = file;
      if (newFile) {
        setValue('logoFooter', urlFile, { shouldValidate: true });
      }
    },
    [setValue, listImageDeleted, currentFooterUrl, setListImageDeleted]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('logoHeader')}
        </Typography>
      </Grid>
      {/* Images */}
      <Grid item xs={12}>
        <RHFUpload
          thumbnail
          name="logoHeader"
          onDrop={(acceptedFiles: File[]) => handleDropSingleFile(acceptedFiles)}
        />
      </Grid>
       <Grid item xs={12} mt={5}>
        <Typography variant="h6" gutterBottom>
          {t('logoFooter')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RHFUpload
          thumbnail
          name="logoFooter"
          onDrop={(acceptedFiles: File[]) => handleDropSingleFileFooter(acceptedFiles)}
        />
      </Grid>
    </Grid>
  );
};

export default LogoSection;
