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
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { NewsTableRow, NewsTableToolbar } from 'sections/@dashboard/news/list';
import { deleteNews, getNewsList } from 'redux/slices/dashboard/news';
import { DEFAULT_PAGINATION, EVENT_TYPE } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import LoadingComponent from 'pages/components/Loading';

import { dispatch, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { EventParamsType } from '../../../@types/paramsType';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: i18n.t<string>('newsId'), align: 'left', width: 150 },
  { id: 'name', label: i18n.t<string>('newsName'), align: 'left', width: 300 },
  { id: 'description', label: i18n.t<string>('description'), align: 'left', width: 300 },

  {
    id: 'thumbnail',
    label: i18n.t<string>('thumbnail'),
    align: 'left',
    width: 300,
  },
  {
    id: 'isPublish',
    label: i18n.t<string>('public'),
    align: 'left',
    width: 150,
  },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function NewsListPage() {
  const { t } = useLocales();

  const { newsList, newsCount } = useSelector((state) => state.news);
  const [params, setParams] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    eventType: EVENT_TYPE.NEWS,
    keyword: '',
  });
  console.log(newsList);
  const {
    dense,
    order,
    setSelected,
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
    await dispatch(deleteNews([id]));
    await getListNews({
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      eventType: EVENT_TYPE.NEWS,
      keyword: '',
    });
    await setSelected([]);
  };

  const handleDeleteRows = async (selectedRows: string[]) => {
    await dispatch(deleteNews(selectedRows));
    await getListNews({
      pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
      pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
      eventType: EVENT_TYPE.NEWS,
      keyword: '',
    });
    await setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.app.news.edit(id));
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

  const getListNews = async (options: EventParamsType) => {
    setLoading(true);
    try {
      await dispatch(getNewsList(options));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListNews(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('news')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfNews')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('news'), href: PATH_DASHBOARD.app.news.news },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.news.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <NewsTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={newsList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  newsList?.map((row: any) => row.id.toString())
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
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={newsList.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      newsList?.map((row: any) => row.id.toString())
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {newsList?.map((row) => (
                      <NewsTableRow
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
            count={newsCount}
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
