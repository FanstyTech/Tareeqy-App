import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

// material
import { useTheme } from '@material-ui/core/styles';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  DialogTitle
} from '@material-ui/core';
// redux

import { useDispatch, useSelector } from '../../../redux/store';
import { deleteCountry, getCountriesList, getCurrenciesSelectList } from '../../../redux/slices/generalSetting';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar } from '../../../components/_dashboard/user/list';
import SearchNotFound from '../../../components/SearchNotFound';
import Scrollbar from '../../../components/Scrollbar';
import Label from '../../../components/Label';
import { DialogAnimate } from '../../../components/animate';
import { CountryForm, MoreMenu } from '../../../components/_dashboard/generalSettings/countries';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'الاسم', alignRight: false },
  { id: 'company', label: 'الرمز', alignRight: false },
  { id: 'role', label: 'العملة', alignRight: false },
  { id: 'status', label: 'الحالة', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function Countries() {
  const theme = useTheme();

  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const { countriesList, currenciesSelectList } = useSelector((state) => state.generalSetting);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Name');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [itemForEdit, setItemForEdit] = useState(null);
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountriesList());
    dispatch(getCurrenciesSelectList());
  }, [dispatch]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDeleteItem = (Id) => {
    setIsOpenModal(false);
    dispatch(deleteCountry([Id]));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteCountry(selected));
    setSelected([]);
  };

  const handleEditItem = (Id) => {
    const country = countriesList.filter((item) => item.Id === Id);
    setItemForEdit(country[0]);
    setIsOpenModal(true);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = countriesList.map((n) => n.Id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  const handleCloseModal = (e) => {
    setItemForEdit(null);
    setIsOpenModal(false);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countriesList.length) : 0;
  const filteredUsers = applySortFilter(countriesList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="إعدادات عامة : الدول  | طريقي">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="الدول"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'إعدادات عامة', href: PATH_DASHBOARD.generalSetting },
            { name: 'الدول' }
          ]}
          action={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={() => setIsOpenModal(true)}>
              إضافة
            </Button>
          }
        />
        <Card>
          <UserListToolbar
            placeholder="ابحث عن الدولة..."
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            handleDelete={handleDeleteSelected}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={countriesList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { Id, Name, Currency, Code, IsActive, avatarUrl } = row;
                    const status = true;
                    const isItemSelected = selected.indexOf(Id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={Id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, Id)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                              alt={Name}
                              src={`${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${Id}&AttatchmentTypeId=1`}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {Name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{Code}</TableCell>
                        <TableCell align="left">{Currency.Name}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(IsActive === false && 'error') || 'success'}
                          >
                            {IsActive ? 'فعال' : 'غير فعال'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu onDelete={() => handleDeleteItem(Id)} onEdit={() => handleEditItem(Id)} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={countriesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{itemForEdit !== null ? 'تعديل' : 'إضافة'}</DialogTitle>

        <CountryForm
          onCancel={handleCloseModal}
          event={itemForEdit}
          currenciesSelectList={currenciesSelectList}
          handleDelete={() => handleDeleteItem(itemForEdit?.Id)}
        />
      </DialogAnimate>
    </Page>
  );
}
