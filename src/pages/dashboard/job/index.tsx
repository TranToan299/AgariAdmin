import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import ConfirmDialog from 'components/confirm-dialog';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import Iconify from 'components/iconify';
import PageWrapper from 'components/page-wrapper';
import Scrollbar from 'components/scrollbar';
import { useSettingsContext } from 'components/settings';
import { deleteCareer, getListCareer } from 'redux/slices/dashboard/career';
import {
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'components/table';
import { DEFAULT_PAGINATION } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import LoadingComponent from 'pages/components/Loading';

import { dispatch, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { JobTableRow, JobTableToolbar } from '../../../sections/@dashboard/job/list';
import { ParamsType } from '../../../@types/paramsType';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: i18n.t<string>('ID'), align: 'left', minWidth: 80 },
  {
    id: 'brand_id',
    label: i18n.t<string>('brandName'),
    align: 'left',
    minWidth: 250,
  },
  {
    id: 'province_id',
    label: i18n.t<string>('province'),
    align: 'left',
    minWidth: 250,
  },
  {
    id: 'careerName',
    label: i18n.t<string>('careerName'),
    align: 'left',
    minWidth: 250,
  },
  { id: 'field', label: i18n.t<string>('jobField'), align: 'left', minWidth: 250 },
  { id: 'jobType', label: i18n.t<string>('jobType'), align: 'left', minWidth: 300 },
  // { id: 'content', label: i18n.t<string>('content'), align: 'left', minWidth: 250,maxWidth:400 },
  {
    id: 'description',
    label: i18n.t<string>('description'),
    align: 'left',
    minWidth: 300,
  },
  { id: 'isPublish', label: i18n.t<string>('public'), align: 'left', minWidth: 100 },
  // {
  //   id: 'isHighlight',
  //   label: i18n.t<string>('isHighlight'),
  //   align: 'left',
  //   minWidth: 250,
  // },

  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function JobListPage() {
  const { t } = useLocales();
  const { listCareer, careerCount } = useSelector((state) => state.career);
  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
  });
  const {
    dense,
    setSelected,
    order,
    orderBy,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
  } = useTable();

  const [loading, setLoading] = useState<boolean>(false);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteCareer([id]));
    await getCareerList({
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      keyword: '',
    });
    await setSelected([]);
  };

  const handleDeleteRows = async (selectedRows: string[]) => {
    await dispatch(deleteCareer(selectedRows));
    await getCareerList({
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      keyword: '',
    });
    await setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.app.job.edit(id));
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

  const getCareerList = async (options: ParamsType) => {
    setLoading(true);
    try {
      await dispatch(getListCareer(options));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCareerList(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('job')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfJob')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('job'), href: PATH_DASHBOARD.app.job.job },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.job.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <JobTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={listCareer.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  listCareer?.map((row: any) => row.id.toString())
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={listCareer.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      listCareer?.map((row: any) => row.id.toString())
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {listCareer?.map((row) => (
                      <JobTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id.toString())}
                        onSelectRow={() => onSelectRow(row.id.toString())}
                        onDeleteRow={() => handleDeleteRow(row.id.toString())}
                        onEditRow={() => handleEditRow(row.id.toString())}
                      />
                    ))}
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={careerCount}
            page={params.pageIndex - 1}
            rowsPerPage={params.pageSize}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={t('delete')}
        content={
          <>

          {t('deleteConfirmItems',{count: selected.length})}
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            {t('delete')}
          </Button>
        }
      />
    </PageWrapper>
  );
}
