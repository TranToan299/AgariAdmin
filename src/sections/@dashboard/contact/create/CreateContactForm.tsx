import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Utils } from 'utils/utils';
import { Upload } from 'components/upload';
import { postContact } from 'redux/slices/dashboard/contact';
import { dispatch } from 'redux/store';
import { useLocales } from 'locales';

import { contactFormSchema } from 'utils/schemas';
import { IContact } from '../../../../@types/contact';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import ContactFormInfo from './ContactFormInfo';

// ----------------------------------------------------------------------

type Props = {};

export default function CreateContactForm(props: Props) {
  const navigate = useNavigate();
  const [files, setFiles] = useState<(File | string)[]>([]);

  const { t } = useLocales();
  const defaultValues = {
    fullName: '',
    phoneNumber: '',
    email: '',
    note: '',
  };

  const methods = useForm<IContact>({
    resolver: yupResolver(contactFormSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  
  const onSubmit = async (data: IContact) => {
    const fileUrls = await Promise.all(files.map(file => Utils.uploadFile(file, 'test', 'test')));
   
    const submitData = {
      ...data,
      attach_url: fileUrls.join(',')
    };
    await dispatch(postContact(submitData))
    
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <ContactFormInfo />
          <Grid sx={{ mt: 2 }} item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Upload
              multiple
              files={files}
              onDrop={handleDropMultiFile}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              // onUpload={() => console.log('ON UPLOAD')}
            />
          </Grid>

          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.contact.contact)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {t('create')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
