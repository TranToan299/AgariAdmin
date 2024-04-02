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
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getListCareer } from 'redux/slices/dashboard/career';
import { dispatch, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { BrandTableRow, BrandTableToolbar } from 'sections/@dashboard/brand/list';
import { ParamsType } from '../../../@types/paramsType';
import { deleteBrand, getListBrand, setLoading } from 'redux/slices/dashboard/brand';
import brandApi from 'apis/brand.api';
import snackbar from 'utils/snackbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: i18n.t<string>('ID'), align: 'left', minWidth: 80 },
  { id: 'brandCode', label: i18n.t<string>('brandCode'), align: 'left', minWidth: 200 },
  { id: 'brandName', label: i18n.t<string>('brandName'), align: 'left', minWidth: 200 },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function BrandListPage() {
  const { t } = useLocales();
  const { loading, brandList, totalRow } = useSelector((state) => state.brand);

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
    await dispatch(deleteBrand([id]));
    await getBrand({
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      keyword: '',
    });
    setSelected([]);
  };

  const handleDeleteRows = async (selectedRows: string[]) => {
    await dispatch(deleteBrand(selectedRows));
    await getBrand({
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      keyword: '',
    });
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.app.brand.edit(id));
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

  async function getBrand(request: ParamsType) {
    await dispatch(getListBrand(request));
  }

  useEffect(() => {
    getBrand(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('brand')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfBrand')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('brand'), href: PATH_DASHBOARD.app.brand.brand },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.brand.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <BrandTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            {brandList && (
              <TableSelectedAction
                dense={dense}
                numSelected={selected.length}
                rowCount={brandList.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    brandList?.map((row) => row.id.toString())
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
            )}

            <Scrollbar>
              {brandList && (
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={brandList.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        brandList?.map((row) => row.id.toString())
                      )
                    }
                  />

                  <LoadingComponent loading={loading} />
                  <TableBody>
                    {brandList &&
                      brandList?.map((row) => (
                        <BrandTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id.toString())}
                          onSelectRow={() => onSelectRow(row.id.toString())}
                          onDeleteRow={() => handleDeleteRow(row.id.toString())}
                          onEditRow={() => handleEditRow(row.id.toString())}
                        />
                      ))}
                  </TableBody>
                </Table>
              )}
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={totalRow}
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
        title=  {t('delete')}
        content={<>{t('deleteConfirmItems', { count: selected.length })}</>}
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
