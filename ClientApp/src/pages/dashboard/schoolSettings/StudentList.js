import { filter } from 'lodash';
import { useEffect, useState, useHistory } from 'react';
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
import { getAllSchoolStudent, deleteSchoolStudentByIds } from '../../../redux/slices/school';

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
import { MoreMenu } from '../../../components/_dashboard/generalSettings/countries';
import LoadingScreen from '../../../components/LoadingScreen';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'NickName', label: 'الاسم', alignRight: false },
  { id: 'Email', label: 'البريد الالكتروني', alignRight: false },
  { id: 'IdNum', label: 'رقم  الهوية', alignRight: false },
  { id: 'PhoneNumber', label: 'رقم التواصل', alignRight: false },
  { id: 'DateOfBirthString', label: 'تاريخ الميلاد', alignRight: false },
  { id: 'LicenseName', label: 'نوع الرخصة', alignRight: false },
  { id: 'Cost', label: 'السعر ', alignRight: false },
  { id: 'SchoolCurrency', label: 'العملة', alignRight: false },
  { id: 'IsActive', label: 'الحالة', alignRight: false },
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
  const { schoolStudentList, isLoading } = useSelector((state) => state.school);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Name');
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSchoolStudent(1));
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
    dispatch(deleteSchoolStudentByIds([Id]));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteSchoolStudentByIds(selected));
    setSelected([]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = schoolStudentList.map((n) => n.Id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - schoolStudentList.length) : 0;
  const filteredUsers = applySortFilter(schoolStudentList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="إدارة الطلاب | طريقي">
      {isLoading && (
        <LoadingScreen
          sx={{
            ...{
              top: 0,
              left: 0,
              width: 1,
              zIndex: 100,
              position: 'fixed'
            }
          }}
        />
      )}
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="الطلاب"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'إدارة المدارس', href: PATH_DASHBOARD.schoolSetting.list },
            { name: 'الطلاب' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.schoolSetting.createStudent}
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
                  rowCount={schoolStudentList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      Id,
                      LicenseName,
                      Cost,
                      Email,
                      NickName,
                      DateOfBirthString,
                      IdNum,
                      PhoneNumber,
                      SchoolCurrency,
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
                              alt={NickName}
                              src={`${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${Id}&AttatchmentTypeId=0`}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {NickName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{Email}</TableCell>
                        <TableCell align="left">{IdNum}</TableCell>
                        <TableCell align="left">{PhoneNumber}</TableCell>
                        <TableCell align="left">{DateOfBirthString}</TableCell>
                        <TableCell align="left">{LicenseName}</TableCell>
                        <TableCell align="left">{Cost}</TableCell>
                        <TableCell align="left">{SchoolCurrency}</TableCell>

                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(IsActive === false && 'error') || 'success'}
                          >
                            {IsActive ? 'فعال' : 'غير فعال'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenu
                            forUrlPage={`${PATH_DASHBOARD.schoolSetting.root}/${Id}/editStudent`}
                            onDelete={() => handleDeleteItem(Id)}
                            // onEdit={() => handleEditItem(Id)}
                          />
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
            count={schoolStudentList.length}
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
