import { Button, Card, Container, Table, TableBody, TableContainer } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import Iconify from 'components/iconify';
import PageWrapper from 'components/page-wrapper';
import Scrollbar from 'components/scrollbar';
import { useSettingsContext } from 'components/settings';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'components/table';
import { DEFAULT_PAGINATION } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import LoadingComponent from 'pages/components/Loading';

import { getListContact } from 'redux/slices/dashboard/contact';
import { dispatch, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { ContactTableRow } from 'sections/@dashboard/contact/list';
import { ParamsType } from '../../../@types/paramsType';
import { JobTableToolbar } from '../../../sections/@dashboard/job/list';

const TABLE_HEAD = [
  // { id: 'id', label: i18n.t<string>('ID'), align: 'left', width: 150 },
  { id: 'fullName', label: i18n.t<string>('fullName'), align: 'left', width: 200 },
  { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', width: 200 },
  { id: 'email', label: i18n.t<string>('email'), align: 'left', width: 200 },
  { id: 'note', label: i18n.t<string>('note'), align: 'left', width: 200 },
  // {
  //   id: '',
  //   style: {
  //     position: 'sticky',
  //     right: 0,
  //   },
  // },
];

// ----------------------------------------------------------------------

export default function ContactListPage() {
  const { t } = useLocales();
  const { contactList, countContact } = useSelector((state) => state.contact);

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

  const getContact = async (options: ParamsType) => {
    setLoading(true);
    try {
      await dispatch(getListContact(options));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('contact')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfContact')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('contact'), href: PATH_DASHBOARD.app.contact.contact },
            { name: t('list') },
          ]}
        />
        <Card sx={{ mt: 3 }}>
          <JobTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                  rowCount={contactList.length}
                  numSelected={selected.length}
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {contactList?.map((row, index) => (
                      <ContactTableRow key={index} row={row} />
                    ))}
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={countContact}
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
