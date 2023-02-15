import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';
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
import { deleteCountry, getCountriesList, getCurrenciesSelectList } from '../../../../../redux/slices/generalSetting';
// components
import Scrollbar from '../../../../Scrollbar';
import SearchNotFound from '../../../../SearchNotFound';
import { CountryForm, MoreMenu } from '../../../generalSettings/countries';
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
  { id: 'dateOfBirth', label: 'تاريخ الولادة', alignRight: false },
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
    return filter(array, (_user) => _user.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function SchoolEmployee() {
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
                    <TableCell align="center">{Code}</TableCell>
                    <TableCell align="center">{Currency.Name}</TableCell>
                    <TableCell align="center">{Currency.Name}</TableCell>
                    <TableCell align="center">{Currency.Name}</TableCell>
                    <TableCell align="center">{Currency.Name}</TableCell>
                    <TableCell align="center">{Currency.Name}</TableCell>
                    <TableCell align="center">{Currency.Name}</TableCell>
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
        count={countriesList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => `عرض الصفحات   ${from}-${to}  من إجمالي ${count} صفحات`}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>{itemForEdit !== null ? 'تعديل' : 'إضافة'}</DialogTitle>

        <CountryForm
          onCancel={handleCloseModal}
          event={itemForEdit}
          currenciesSelectList={currenciesSelectList}
          handleDelete={() => handleDeleteItem(itemForEdit?.Id)}
        />
      </DialogAnimate>
    </Card>
  );
}
