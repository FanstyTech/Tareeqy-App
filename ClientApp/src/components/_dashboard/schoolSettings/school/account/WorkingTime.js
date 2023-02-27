import { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import PropTypes from 'prop-types';

// material
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
  TextField,
  DialogTitle
} from '@material-ui/core';
import { LoadingButton, TimePicker } from '@material-ui/lab';

// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getSchoolWorkingTime, saveSchoolWorkingTime } from '../../../../../redux/slices/school';

// ----------------------------------------------------------------------
import { UserListHead } from '../../../user/list';

const TABLE_HEAD = [
  { id: 'day', label: 'اليوم', alignRight: false },
  { id: 'startTime', label: 'وقت البدء', alignRight: false },
  { id: 'endTime', label: 'وقت الانتهاء', alignRight: false },
  { id: 'noOfHours', label: 'عدد ساعات العمل', alignRight: false }
];
WorkingTime.propTypes = {
  schoolData: PropTypes.object
};
export default function WorkingTime({ schoolData }) {
  const { enqueueSnackbar } = useSnackbar();
  const { schoolWorkingTimeList } = useSelector((state) => state.school);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchoolWorkingTime(schoolData?.Id));
  }, [dispatch]);

  useEffect(() => {
    if (schoolWorkingTimeList?.length > 0) {
      setWorkItmeList(schoolWorkingTimeList);
    }
  }, [schoolWorkingTimeList]);

  const [workItmeList, setWorkItmeList] = useState(schoolWorkingTimeList || []);

  const handleSaveChange = () => {
    dispatch(saveSchoolWorkingTime(workItmeList));
  };

  const handleSelect = (event, Id) => {
    const newLst = workItmeList.map((item) => {
      if (item.Day === Id) {
        return { ...item, IsSelected: !item.IsSelected };
      }
      return item;
    });
    setWorkItmeList(newLst);
  };

  const setFieldChange = (name, Id, value) => {
    const inputDateString = value;

    const date = new Date(inputDateString);

    // Extract the individual date and time components
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to convert from 0-based to 1-based month
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Format the components as a string in the ISO format
    const isoDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    const newLst = workItmeList.map((item) => {
      if (item.Day === Id && name === 'StartTime') {
        return { ...item, StartTime: isoDateString };
      }
      if (item.Day === Id && name === 'EndTime') {
        return { ...item, EndTime: isoDateString };
      }
      return item;
    });
    setWorkItmeList(newLst);
  };

  function getWorkingHours(startDateString, endDateString) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const startHours = startDate.getHours();
    const startMin = startDate.getMinutes();

    const endHours = endDate.getHours();
    const endMin = endDate.getMinutes();
    const totalMin = Math.abs(endMin - startMin);
    let totalMinString = `.${totalMin}`;
    if (totalMin <= 0) {
      totalMinString = '';
    }
    const totalHours = `${endHours - startHours}${totalMinString}`;
    return totalHours;
  }

  return (
    <Card sx={{ p: 3 }}>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <UserListHead headLabel={TABLE_HEAD} diableSelectAll={1} />

          <TableBody>
            {workItmeList.map((row) => {
              const { DayName, Day, IsSelected, StartTime, EndTime } = row;
              return (
                <TableRow hover key={Day} tabIndex={-1} selected={IsSelected} aria-checked={IsSelected} role="checkbox">
                  <TableCell padding="checkbox">
                    <Checkbox checked={IsSelected} onChange={(event) => handleSelect(event, Day)} />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="subtitle2" noWrap>
                        {DayName}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    {' '}
                    <TimePicker
                      value={StartTime}
                      disabled={!IsSelected}
                      label="وقت البدء"
                      onChange={(date) => setFieldChange('StartTime', Day, date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TimePicker
                      value={EndTime}
                      disabled={!IsSelected}
                      label="وقت الانتهاء"
                      onChange={(date) => setFieldChange('EndTime', Day, date)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </TableCell>
                  <TableCell align="center">{getWorkingHours(StartTime, EndTime)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={3} alignItems="flex-end">
        <LoadingButton type="button" onClick={handleSaveChange} variant="contained">
          حفظ التعديلات
        </LoadingButton>
      </Stack>
    </Card>
  );
}
