import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  DialogTitle
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getAllSchoolEmployee, deleteSchoolEmployeeeByIds } from '../../../../../redux/slices/school';
// components
import Scrollbar from '../../../../Scrollbar';
import SearchNotFound from '../../../../SearchNotFound';
import { MoreMenu } from '../../../generalSettings/countries';
import { SchoolEmployeeForm } from './index';
import Label from '../../../../Label';
import { UserListToolbar, UserListHead } from '../../../user/list';
import { DialogAnimate } from '../../../../animate';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'employeeName', label: 'اسم الموظف', alignRight: false },
  { id: 'email', label: 'البريد الالكروني', alignRight: false },
  { id: 'employeePhoneNumber', label: 'رقم الهاتف', alignRight: false },
  { id: 'salary', label: 'الراتب', alignRight: false },
  { id: 'dateOfHiring', label: 'تاريخ التعيين', alignRight: false },
  { id: 'dateOfBirth', label: 'تاريخ يوم الميلاد', alignRight: false },
  { id: 'registerDate', label: 'تاريخ الاضافة', alignRight: false },
  { id: 'role', label: 'الصلاحيات', alignRight: false },
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
    return filter(array, (_user) => _user.NickName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
SchoolEmployee.propTypes = {
  schoolData: PropTypes.object
};

export default function SchoolEmployee({ schoolData }) {
  const theme = useTheme();

  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const { schoolEmployeeList } = useSelector((state) => state.school);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Name');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [itemForEdit, setItemForEdit] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSchoolEmployee(schoolData?.Id));
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
    dispatch(deleteSchoolEmployeeeByIds([Id]));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteSchoolEmployeeeByIds(selected));
    setSelected([]);
  };

  const handleEditItem = (Id) => {
    const employee = schoolEmployeeList.filter((item) => item.Id === Id);
    setItemForEdit(employee[0]);
    setIsOpenModal(true);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = schoolEmployeeList.map((n) => n.Id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - schoolEmployeeList.length) : 0;
  const filteredUsers = applySortFilter(schoolEmployeeList, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Card sx={{ p: 3 }}>
      {' '}
      <UserListToolbar
        placeholder="ابحث عن الموظف..."
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        handleDelete={handleDeleteSelected}
        hideFilterList={1}
        hasAddBtn={1}
        handleClickAddEvent={() => {
          setIsOpenModal(true);
        }}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={schoolEmployeeList.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const {
                  Id,
                  NickName,
                  PhoneNumber,
                  Salary,
                  SchoolProfileId,
                  Email,
                  Gender,
                  SchoolUserType,
                  IdNum,
                  DateOfBirth,
                  DateOfHiring,
                  UserId,
                  DateOfHiringString,
                  DateOfBirthString,
                  RegisterDateString,
                  IsActive
                } = row;
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
                          alt={NickName}
                          src={`${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${Id}&AttatchmentTypeId=0`}
                        />
                        <Typography variant="subtitle2" noWrap>
                          {NickName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{Email}</TableCell>
                    <TableCell align="center">{PhoneNumber}</TableCell>
                    <TableCell align="center">{Salary}</TableCell>
                    <TableCell align="center">{DateOfHiringString}</TableCell>
                    <TableCell align="center">{DateOfBirthString}</TableCell>
                    <TableCell align="center">{RegisterDateString}</TableCell>
                    <TableCell align="center">{SchoolUserType}</TableCell>
                    <TableCell align="center">
                      <Label
                        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                        color={(IsActive === false && 'error') || 'success'}
                      >
                        {IsActive ? 'فعال' : 'غير فعال'}
                      </Label>
                    </TableCell>

                    <TableCell align="center">
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
        count={schoolEmployeeList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => `عرض الصفحات   ${from}-${to}  من إجمالي ${count} صفحات`}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DialogAnimate open={isOpenModal} fullWidth maxWidth="md" onClose={handleCloseModal}>
        <DialogTitle>{itemForEdit !== null ? 'تعديل' : 'إضافة'}</DialogTitle>

        <SchoolEmployeeForm
          onCancel={handleCloseModal}
          event={itemForEdit}
          schoolData={schoolData}
          handleDelete={() => handleDeleteItem(itemForEdit?.Id)}
        />
      </DialogAnimate>
    </Card>
  );
}
