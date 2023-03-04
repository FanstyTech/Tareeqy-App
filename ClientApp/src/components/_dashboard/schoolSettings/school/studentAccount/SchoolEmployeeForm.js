import { useCallback, useState } from 'react';

import { merge } from 'lodash';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { useSnackbar } from 'notistack5';

// material
import {
  Box,
  Stack,
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  FormControlLabel,
  DialogActions,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton, MobileDateTimePicker, MobileDatePicker } from '@material-ui/lab';
// redux
import { useDispatch } from '../../../../../redux/store';
import { saveSchoolEmployee } from '../../../../../redux/slices/school';

//
import { UploadAvatar } from '../../../../upload';
// utils
import { fData } from '../../../../../utils/formatNumber';
//
const getInitialValues = (event) => {
  const _event = {
    Id: null,
    NickName: '',
    Email: '',
    IdNum: '',
    Salary: '',
    PhoneNumber: '',
    SchoolUserType: '',
    Gender: '',
    IsActive: true,
    avatarUrl: null
  };

  // {
  //   NickName, Email, DateOfHiring, DateOfBirth, IdNum, Salary, PhoneNumber, SchoolUserType, Gender, IsActive;
  // }
  if (event !== null) {
    _event.avatarUrl = `${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${event.Id}&AttatchmentTypeId=0`;
    const _newEevent = merge({}, _event, event);
    return _newEevent;
  }
  return _event;
};
// ----------------------------------------------------------------------

SchoolEmployeeForm.propTypes = {
  event: PropTypes.object,
  onCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  schoolData: PropTypes.object
};
export default function SchoolEmployeeForm({ event, onCancel, handleDelete, schoolData }) {
  const isCreating = !event;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadFile, SetUploadFile] = useState();
  const genderSelectList = [
    { Id: 1, Label: 'ذكر' },
    { Id: 2, Label: 'أنثى' }
  ];
  const employeeTypeSelectList = [
    { Id: 1, Label: 'مدير' },
    { Id: 2, Label: 'مدرب' },
    { Id: 3, Label: 'موظف مالي' }
  ];
  const EventSchema = Yup.object().shape({
    NickName: Yup.string().max(255).required('حقل الاسم اجباري'),
    Email: Yup.string().max(255).required('حقل البريد الالكتروني اجباري'),
    IdNum: Yup.string().max(255).required('حقل رقم الهوية اجباري'),
    Salary: Yup.string().max(255).required('حقل الراتب اجباري'),
    PhoneNumber: Yup.string().max(255).required('حقل رقم الهاتف اجباري'),
    SchoolUserType: Yup.string().max(255).required('حقل نوع الموظف اجباري'),
    Gender: Yup.string().max(255).required('حقل الجنس اجباري'),
    avatarUrl: Yup.mixed().optional('صورة الموظف اجباري')
  });

  const formik = useFormik({
    initialValues: getInitialValues(event),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          NickName: values.NickName,
          Email: values.Email,
          DateOfBirth: '',
          DateOfHiring: '',
          IdNum: values.IdNum,
          Salary: values.Salary,
          PhoneNumber: values.PhoneNumber,
          SchoolUserType: values.SchoolUserType,
          Gender: values.Gender,
          IsActive: values.IsActive,
          SchoolProfileId: schoolData?.Id
        };

        if (event?.Id) {
          newEvent.Id = event?.Id;
          newEvent.UserId = event?.UserId;
          try {
            newEvent.DateOfBirth = values.DateOfBirth?.toLocaleDateString('en-GB');
          } catch {
            newEvent.DateOfBirth = event.DateOfBirth;
          }

          try {
            newEvent.DateOfHiring = values.DateOfHiring?.toLocaleDateString('en-GB');
          } catch {
            newEvent.DateOfHiring = event.DateOfHiring;
          }
        } else {
          newEvent.DateOfBirth = values.DateOfBirth
            ? values.DateOfBirth?.toLocaleDateString('en-GB')
            : new Date().toLocaleDateString('en-GB');
          newEvent.DateOfHiring = values.DateOfHiring
            ? values.DateOfHiring?.toLocaleDateString('en-GB')
            : new Date().toLocaleDateString('en-GB');
        }

        dispatch(saveSchoolEmployee(newEvent, uploadFile));
        enqueueSnackbar('تمت العملية بنجاح', { variant: 'success' });

        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });
  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        SetUploadFile(file);
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Box sx={{ mb: 0 }}>
            <UploadAvatar
              accept="image/*"
              file={values.avatarUrl}
              maxSize={3145728}
              onDrop={handleDrop}
              error={Boolean(touched.avatarUrl && errors.avatarUrl)}
              caption={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary'
                  }}
                >
                  مسموح *.jpeg, *.jpg, *.png, *.gif
                  <br /> أقصى حجم {fData(3145728)}
                </Typography>
              }
            />
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {touched.avatarUrl && errors.avatarUrl}
            </FormHelperText>
          </Box>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="الاسم"
              {...getFieldProps('NickName')}
              error={Boolean(touched.NickName && errors.NickName)}
              helperText={touched.NickName && errors.NickName}
            />

            <TextField
              fullWidth
              label="البريد الالكتروني"
              {...getFieldProps('Email')}
              error={Boolean(touched.Email && errors.Email)}
              helperText={touched.Email && errors.Email}
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <MobileDatePicker
              label="تاريخ  يوم الميلاد"
              value={values.DateOfBirth}
              inputFormat="dd/MM/yyyy"
              onChange={(date) => setFieldValue('DateOfBirth', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <MobileDatePicker
              label="تاريخ التعيين"
              value={values.DateOfHiring}
              inputFormat="dd/MM/yyyy"
              onChange={(date) => setFieldValue('DateOfHiring', date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="رقم الهوية"
              {...getFieldProps('IdNum')}
              error={Boolean(touched.IdNum && errors.IdNum)}
              helperText={touched.IdNum && errors.IdNum}
            />
            <TextField
              fullWidth
              label="الراتب"
              {...getFieldProps('Salary')}
              error={Boolean(touched.Salary && errors.Salary)}
              helperText={touched.Salary && errors.Salary}
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="رقم الهاتف"
              {...getFieldProps('PhoneNumber')}
              error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
              helperText={touched.PhoneNumber && errors.PhoneNumber}
            />
            <TextField
              select
              fullWidth
              label="نوع الموظف"
              placeholder="نوع الموظف"
              {...getFieldProps('SchoolUserType')}
              SelectProps={{ native: true }}
              error={Boolean(touched.SchoolUserType && errors.SchoolUserType)}
              helperText={touched.SchoolUserType && errors.SchoolUserType}
            >
              <option value="" />
              {employeeTypeSelectList?.map((option) => (
                <option key={option.Id} value={option.Id}>
                  {option.Label}
                </option>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              select
              fullWidth
              label="الجنس"
              placeholder="الجنس"
              {...getFieldProps('Gender')}
              SelectProps={{ native: true }}
              error={Boolean(touched.Gender && errors.Gender)}
              helperText={touched.Gender && errors.Gender}
            >
              <option value="" />
              {genderSelectList?.map((option) => (
                <option key={option.Id} value={option.Id}>
                  {option.Label}
                </option>
              ))}
            </TextField>
          </Stack>

          <FormControlLabel
            control={<Switch checked={values.IsActive} {...getFieldProps('IsActive')} />}
            label="الحالة"
          />
        </Stack>
        <DialogActions>
          {!isCreating && (
            <Tooltip title="Delete Event">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
            إلغاء
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
            حفظ
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
