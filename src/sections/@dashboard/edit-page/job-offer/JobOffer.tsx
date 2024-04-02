import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RHFAutocomplete, RHFTextField, RHFUpload } from '../../../../components/hook-form';
import { useLocales } from '../../../../locales';
import { dispatch, useSelector } from '../../../../redux/store';
import { getListCareer } from '../../../../redux/slices/dashboard/career';
import { DEFAULT_PAGINATION } from '../../../../constants/app.constants';
import TextEditor from '../../../../components/common/TextEditor';

type IProps = {
  setValue: UseFormSetValue<IHomePage>;
  listImageDeleted: string[];
  setListImageDeleted: React.Dispatch<React.SetStateAction<string[]>>;
  currentBackgroundUrl: string | File;
  editValue: string;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
};

const JobOffer = ({
  setValue,
  listImageDeleted,
  setListImageDeleted,
  currentBackgroundUrl,
  editValue,
  setEditValue,
}: IProps) => {
  const { t } = useLocales();
  const { listCareer } = useSelector((state) => state.career);
  // const currentCarrer = listCareer?.find((x) => x.id.toString() === employeeDetails.project_id);
  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
  });

  const debounceSearchProject = useRef<any>(null);

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
        setValue('jobOffer.image', urlFile, { shouldValidate: true });
      }
    },
    [setValue, listImageDeleted, currentBackgroundUrl, setListImageDeleted]
  );

  const handleGetJob = async (options: any) => {
    await dispatch(getListCareer(options));
  };

  useEffect(() => {
    handleGetJob(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {t('jobOffer')}
        </Typography>
      </Grid>
      <Grid container item xs={12} md={12}>
        {/* Images */}
        <Grid item xs={12}>
          <RHFUpload
            thumbnail
            name="jobOffer.image"
            onDrop={(acceptedFiles: File[]) => handleDropSingleFile(acceptedFiles)}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={12} spacing={3}>
        {/* Outstanding job */}
        <Grid item xs={12}>
          <RHFAutocomplete
            onInputChange={(event, newInputValue) => {
              if (debounceSearchProject.current) {
                clearTimeout(debounceSearchProject.current);
              }
              debounceSearchProject.current = setTimeout(() => {
                handleGetJob({
                  ...params,
                  keyword: newInputValue,
                });
              }, 1000);
            }}
            label={t('jobsOutstanding')}
            name="jobOffer.outstandingJobId"
            handleScroll={() => {
              handleGetJob({
                ...params,
                pageSize: (params.pageSize += 10),
              });
            }}
            options={listCareer?.map((item) => {
              return {
                label: `${item.brandName} - ${item.name} (${item.provinceName})`,
                value: item.id,
              };
            })}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
          />
        </Grid>

        {/* title */}
        <Grid item xs={12}>
          <RHFTextField name="jobOffer.title" label={t('title')} />
        </Grid>
        {/* content */}
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {t('subtitle')}
          </Typography>
          <TextEditor initValue={editValue} setEditorValue={setEditValue} />

          {/* <RHFTextField name="jobOffer.subtitle" label={t('subtitle')} multiline rows={4} /> */}
        </Grid>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="jobOffer.content[0].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="jobOffer.content[0].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="jobOffer.content[1].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="jobOffer.content[1].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="jobOffer.content[2].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="jobOffer.content[2].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          {/* title */}
          <Grid item xs={12} md={3}>
            <RHFTextField name="jobOffer.content[3].title" label={t('title')} size="small" />
          </Grid>
          {/* content */}
          <Grid item xs={12} md={9}>
            <RHFTextField name="jobOffer.content[3].content" label={t('content')} size="small" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobOffer;
