import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { RHFUpload } from '../../../../components/hook-form';
import { UseFormSetValue } from 'react-hook-form';
import { useCallback } from 'react';
import { CustomFile } from '../../../../components/upload';

type IProps = {
  setValue: UseFormSetValue<IHomePage>;
  values: IHomePage;
  listImageDeleted: string[];
  setListImageDeleted: React.Dispatch<React.SetStateAction<string[]>>;
};

const Partner = ({ setValue, values, listImageDeleted, setListImageDeleted }: IProps) => {
  const handleDropMultiFile = useCallback(
    async (acceptedFiles: File[]) => {
      const files = values.partner || [];
      const newFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      setValue(`partner`, [...files, ...newFiles], { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.partner]
  );

  const removeImageHandle = (file: string | CustomFile) => {
    // if (typeof file === 'string') {
    //   setListImageDeleted([...listImageDeleted, file]);
    // }
    const newImages: (string | File)[] = values.partner.filter((item) => item !== file);
    const newImagesString: string[] = [];
    newImages.forEach((item) => {
      if (typeof item === 'string') {
        newImagesString.push(item);
      }
    });
    if (newImagesString.length > 0) {
      setListImageDeleted([...listImageDeleted, ...newImagesString]);
    }
    setValue(`partner`, newImages, { shouldValidate: true });
  };

  return (
    <Grid container xs={12} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('partner')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RHFUpload
          multiple
          thumbnail
          name="partner"
          onDrop={(acceptedFiles: File[]) => handleDropMultiFile(acceptedFiles)}
          onRemoveAll={() => {
            setValue('partner', []);
            // setArrFiles([]);
            // setIsRemoveAll(true);
          }}
          onRemove={(file) => removeImageHandle(file)}
        />
      </Grid>
    </Grid>
  );
};

export default Partner;
