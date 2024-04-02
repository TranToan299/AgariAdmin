import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/system';
import { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { RHFTextField, RHFUpload } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';
import { CustomFile } from '../../../../components/upload';
import TextEditor from '../../../../components/common/TextEditor';

type IProps = {
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
};

const FooterSection = ({ editValue, setEditValue }: IProps) => {
  const { t } = useLocales();

  const theme = useTheme();
  const ERROR_MAIN = theme.palette.error.main;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('Footer')}
        </Typography>
      </Grid>
      {/* title */}
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          {t('address')}
        </Typography>
        <TextEditor initValue={editValue} setEditorValue={setEditValue} />
        {/* <RHFTextField name="address" label={t('address')} multiline rows={6} /> */}
      </Grid>
      {/* linkFacebook */}
      <Grid item xs={12}>
        <RHFTextField name="linkFacebook" label={t('linkFacebook')} />
      </Grid>
      {/* linkZalo */}
      <Grid item xs={12}>
        <RHFTextField name="linkZalo" label={t('linkZalo')} />
      </Grid>
      {/* linkTiktok */}
      <Grid item xs={12}>
        <RHFTextField name="linkTiktok" label={t('linkTiktok')} />
      </Grid>
    </Grid>
  );
};

export default FooterSection;
