import { Grid, Typography } from '@mui/material';
import { RHFTextField, RHFUpload } from '../../../../components/hook-form';
import { UseFormSetValue } from 'react-hook-form';
import { useCallback } from 'react';
import { CustomFile } from '../../../../components/upload';
import { useLocales } from '../../../../locales';

type IProps = {
  setValue: UseFormSetValue<IAboutPage>;
  values: IAboutPage;
  listImageDeleted: string[];
  setListImageDeleted: React.Dispatch<React.SetStateAction<string[]>>;
};

const OurTeam = ({ setValue, values, listImageDeleted, setListImageDeleted }: IProps) => {
  const { t } = useLocales();

  const handleDropMultiFile = useCallback(
    async (acceptedFiles: File[]) => {
      const files = values.ourTeam.listImageUrl || [];
      const newFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      setValue(`ourTeam.listImageUrl`, [...files, ...newFiles], { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.ourTeam.listImageUrl]
  );

  const removeImageHandle = (file: string | CustomFile) => {
    // if (typeof file === 'string') {
    //   setListImageDeleted([...listImageDeleted, file]);
    // }
    const newImages: (string | File)[] = values.ourTeam.listImageUrl.filter(
      (item) => item !== file
    );
    const newImagesString: string[] = [];
    newImages.forEach((item) => {
      if (typeof item === 'string') {
        newImagesString.push(item);
      }
    });
    if (newImagesString.length > 0) {
      setListImageDeleted([...listImageDeleted, ...newImagesString]);
    }
    setValue(`ourTeam.listImageUrl`, newImages, { shouldValidate: true });
  };

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('ourTeam')}
        </Typography>
      </Grid>
      {/* title */}
      <Grid item xs={12}>
        <RHFTextField name="ourTeam.title" label={t('title')} />
      </Grid>
      {/* content */}
      <Grid item xs={12}>
        <RHFTextField name="ourTeam.content" label={t('content')} multiline rows={4} />
      </Grid>
      <Grid item xs={12}>
        <RHFUpload
          multiple
          thumbnail
          name="ourTeam.listImageUrl"
          onDrop={(acceptedFiles: File[]) => handleDropMultiFile(acceptedFiles)}
          onRemoveAll={() => {
            setValue('ourTeam.listImageUrl', []);
         
          }}
          onRemove={(file) => removeImageHandle(file)}
        />
      </Grid>
    </Grid>
  );
};

export default OurTeam;
