import { Button, Card, Container, Table, TableBody, TableContainer } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import Iconify from 'components/iconify';
import PageWrapper from 'components/page-wrapper';
import Scrollbar from 'components/scrollbar';
import { useSettingsContext } from 'components/settings';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'components/table';
import { JobApplyTableRow, JobApplyTableToolbar } from 'sections/@dashboard/jobApply/list';

import { getListApplyCareer } from 'redux/slices/dashboard/apply-careers';

import { DEFAULT_PAGINATION } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import LoadingComponent from 'pages/components/Loading';

import { dispatch, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { ApplyCareer } from '../../../@types/applyCareer';
import { ParamsType } from '../../../@types/paramsType';

const TABLE_HEAD = [
  // { id: 'id', label: i18n.t<string>('ID'), align: 'left', width: 150 },
  { id: 'fullName', label: i18n.t<string>('fullName'), align: 'left', minWidth: 200 },
  { id: 'province', label: i18n.t<string>('province'), align: 'left', minWidth: 200 },
  { id: 'district', label: i18n.t<string>('district'), align: 'left', minWidth: 200 },

  { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', minWidth: 200 },
  { id: 'dateOfBirth', label: i18n.t<string>('dateOfBirth'), align: 'left', minWidth: 200 },
  { id: 'experience', label: i18n.t<string>('experience'), align: 'left', minWidth: 200 },
  { id: 'careerName', label: i18n.t<string>('careerName'), align: 'left', minWidth: 200 },

  { id: 'applyCareer', label: i18n.t<string>('applyCareer'), align: 'left', minWidth: 200 },

  // {
  //   id: '',
  //   style: {
  //     position: 'sticky',
  //     right: 0,
  //   },
  // },
];

// ----------------------------------------------------------------------

export default function JobApplyPage() {
  const { t } = useLocales();
  const { listApplyCareer, countApplyCareer } = useSelector((state) => state.careerApply);

  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
  });

  const { dense, order, orderBy, selected, onSelectRow, onSelectAllRows, onSort } = useTable();

  const [loading, setLoading] = useState<boolean>(false);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleClick = async () => {
    await setParams({
      ...params,
      pageIndex: 1,
      keyword: filterName,
    });
  };

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setParams({
        ...params,
        pageIndex: newPage + 1,
      });
    },
    [params]
  );

  const onChangeRowsPerPage = useCallback(
    (event: any) => {
      setParams({
        ...params,
        pageSize: event.target.value,
      });
    },
    [params]
  );

  const getListApplyJob = async (options: ParamsType) => {
    setLoading(true);
    try {
      await dispatch(getListApplyCareer(options));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListApplyJob(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('jobApply')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfJobApply')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('jobApply'), href: PATH_DASHBOARD.app.job.apply },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.job.applyNew}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <JobApplyTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={listApplyCareer.length}
                  numSelected={selected.length}
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {listApplyCareer?.map((row: ApplyCareer, index) => (
                      <JobApplyTableRow key={row.id} row={row} />
                    ))}
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={countApplyCareer}
            page={params.pageIndex - 1}
            rowsPerPage={params.pageSize}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </Container>
    </PageWrapper>
  );
}
