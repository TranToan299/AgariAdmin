import { Box, Card, Grid, MenuItem } from '@mui/material';
import TextEditor from 'components/common/TextEditor';
import Editor from 'components/editor/Editor';
import { RHFAutocomplete, RHFCheckbox, RHFSelect, RHFTextField } from 'components/hook-form';
import { JOB_TYPE } from 'constants/app.constants';

import { useLocales } from 'locales';
import { useSelector } from 'redux/store';

type Props = {
  setEditValue?: any;
  editValue?: any;
};
const JobFormInfo = ({ setEditValue, editValue }: Props) => {
  const { t } = useLocales();
  // useState
  const { provinceList } = useSelector((state) => state.province);
  const { brandList } = useSelector((state) => state.objectType);
  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFSelect isRequired name="brand_id" placeholder="" label={t('brandName')}>
              {brandList?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.objectName}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFAutocomplete
              isRequired
              label={t('province')}
              name="province_id"
              shrink={false}
              options={provinceList?.map((item) => {
                return {
                  label: `${item.code} - ${item.name}`,
                  value: item.id,
                };
              })}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="name" label={t('careerName')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField isRequired name="field" label={t('jobField')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFSelect name="jobType" placeholder="jobType" label={t('jobType')}>
              {JOB_TYPE?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </RHFSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="description" label={t('description')} />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <RHFCheckbox name="isPublish" label={t('public')} />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <RHFCheckbox name="isHighlight" label={t('jobsOutstanding')} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextEditor initValue={editValue} setEditorValue={setEditValue} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default JobFormInfo;
