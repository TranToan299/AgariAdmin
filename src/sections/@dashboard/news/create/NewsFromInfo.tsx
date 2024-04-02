import { Box, Card, Grid, Typography } from '@mui/material';
import { useCallback } from 'react';
import TextEditor from 'components/common/TextEditor';
import { RHFCheckbox, RHFTextField, RHFUpload } from 'components/hook-form';
import { useLocales } from 'locales';

type Props = {
  editValue?: any;
  methods?: any;
  setEditValue?: any;
};
const NewsFromInfo = ({ editValue, setEditValue, methods }: Props) => {
  const { t } = useLocales();
  const { setValue } = methods;
  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const urlFile = file;
      if (newFile) {
        setValue('thumbnail', urlFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="name" isRequired label={t('nameNews')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="description" isRequired label={t('description')} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <RHFCheckbox name="isPublish" label={t('public')} />
          </Grid>
  
          <Grid sx={{ mt: 2 }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ mb: 2 }} variant="body1">
              {t('thumbnail')}
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <RHFUpload
              name="thumbnail"
              maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('thumbnail', null, { shouldValidate: true })}
            />
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextEditor initValue={editValue} setEditorValue={setEditValue} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default NewsFromInfo;
