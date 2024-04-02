import { useEffect, useRef, useState } from 'react';
import { Box, Card, Grid, MenuItem } from '@mui/material';
import { RHFAutocomplete, RHFDatePicker, RHFSelect, RHFTextField } from 'components/hook-form';
import UploadFileV2 from 'components/upload/UploadFileV2';
import { DEFAULT_PAGINATION } from 'constants/app.constants';

import { useLocales } from 'locales';
import { getListCareer } from 'redux/slices/dashboard/career';
import { dispatch, useSelector } from 'redux/store';

type Props = {
  fileUrl?: any;
  setFileUrl?: any;
  handleChangeProvince?: any;
  province?: any;
};

const JobApplyFormInfo = ({ fileUrl, setFileUrl, handleChangeProvince, province }: Props) => {
  const { t } = useLocales();
  const debounceSearch = useRef<any>(null);

  const { provinceList } = useSelector((state) => state.province);
  const { districtList } = useSelector((state) => state.district);

  const { listCareer } = useSelector((state) => state.career);
  const [careerSelected, setCareerSelected] = useState('');
  const [paramsCareers, setParamsCareers] = useState({
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    keyword: '',
  });

  const handleSelected = (e: any) => {
    setCareerSelected(e.target.value);
  };


  
  useEffect(() => {
    dispatch(getListCareer(paramsCareers));
  }, [paramsCareers]);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="fullName" isRequired label={t('fullName')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFDatePicker isRequired name="dateOfBirth" label={t('dateOfBirth')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="phoneNumber" isRequired label={t('phoneNumber')} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={6}>
            <RHFAutocomplete
              isRequired
              onSelect={() => handleChangeProvince()}
              name="province_id"
              label={t('province')}
              options={provinceList.map((item) => {
                return {
                  label: `${item.code} - ${item.name}`,
                  value: item.id,
                };
              })}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} xl={6}>
            <RHFAutocomplete
              isRequired
              name="district_id"
              label={t('district')}
              options={
                province
                  ? districtList.map((item) => {
                      return {
                        label: `${item.code} - ${item.name}`,
                        value: item.id,
                      };
                    })
                  : []
              }
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="experience" isRequired label={t('experience')} />
          </Grid>
          <Grid item xs={12} xl={6}>
            {/* <RHFSelect
              isRequired
              value={careerSelected}
              handleChange={handleSelected}
              name="career_id"
              label={t('career')}
              placeholder={t('career')}
              onScrollEvent={() => {
                setParamsCareers({
                  ...paramsCareers,
                  pageSize: (paramsCareers.pageSize += 10),
                });
              }}
            >
              {listCareer?.map((item: any, index: number) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </RHFSelect> */}
            <RHFAutocomplete
              onInputChange={(event, newInputValue) => {
                if (debounceSearch.current) {
                  clearTimeout(debounceSearch.current);
                }
                debounceSearch.current = setTimeout(() => {
                  setParamsCareers({
                    ...paramsCareers,
                    keyword: newInputValue,
                  });
                }, 1000);
              }}
              label={t('career')}
              placeholder={t('career')}
              name="career_id"
              handleScroll={() => {
                setParamsCareers({
                  ...paramsCareers,
                  pageSize: (paramsCareers.pageSize += 10),
                });
              }}
              options={listCareer?.map((item) => {
                return {
                  label: `${item.name}`,
                  value: item.id,
                };
              })}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
             
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <UploadFileV2
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
              fileNameUpload={t('applyCareer')}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default JobApplyFormInfo;
