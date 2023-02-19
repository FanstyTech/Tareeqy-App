import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

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
import { deleteCountry } from '../../../redux/slices/generalSetting';
import { getAllSchoolProfile } from '../../../redux/slices/school';

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
  { id: 'nameL', label: 'الاسم بالعربية', alignRight: false },
  { id: 'nameF', label: 'الاسم بالانجليزية', alignRight: false },
  { id: 'licensedOperatorNumber', label: 'رقم المشتغل المرخص', alignRight: false },
  { id: 'contactNumber', label: 'رقم التواصل', alignRight: false },
  { id: 'agreement', label: 'نوع الاتفاقية', alignRight: false },
  { id: 'agreementPrice', label: 'سعر الاتفاقية', alignRight: false },
  { id: 'currency', label: 'العملة', alignRight: false },
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
    return filter(array, (_user) => _user.NameL.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function () {
  const theme = useTheme();

  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const { schoolList } = useSelector((state) => state.school);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Name');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [itemForEdit, setItemForEdit] = useState(null);
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSchoolProfile());
  }, [dispatch]);

  useEffect(() => {
    console.log('schoolList', schoolList);
  }, [schoolList]);
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
    const country = schoolList.filter((item) => item.Id === Id);
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
      const newSelecteds = schoolList.map((n) => n.Id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - schoolList.length) : 0;
  const filteredUsers = applySortFilter(schoolList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="المدارس: إدارة المدارس | طريقي">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="المدارس"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'إدارة المدارس', href: PATH_DASHBOARD.schoolSetting.list },
            { name: 'المدارس' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.schoolSetting.newSchool}
              startIcon={<Icon icon={plusFill} />}
            >
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
                  rowCount={schoolList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      Id,
                      NameL,
                      NameF,
                      LicensedOperatorNumber,
                      ContactNumber,
                      Agreement,
                      AgreementPrice,
                      Currency,
                      IsActive
                    } = row;

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
                              alt={NameL}
                              src={`${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${Id}&AttatchmentTypeId=2`}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {NameL}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{NameF}</TableCell>
                        <TableCell align="left">{LicensedOperatorNumber}</TableCell>
                        <TableCell align="left">{ContactNumber}</TableCell>
                        <TableCell align="left">{Agreement?.Title}</TableCell>
                        <TableCell align="left">{AgreementPrice}</TableCell>
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
                      <TableCell colSpan={TABLE_HEAD.length} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={TABLE_HEAD.length} sx={{ py: 3 }}>
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
            count={schoolList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows={({ from, to, count }) => `عرض الصفحات   ${from}-${to}  من إجمالي ${count} صفحات`}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
