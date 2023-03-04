import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useCallback, useState, useEffect } from 'react';

import { merge } from 'lodash';
import PropTypes from 'prop-types';

import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton, MobileDatePicker } from '@material-ui/lab';

// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getLicenseTypeForSelect, saveSchooStudent } from '../../../../../redux/slices/school';

// hooks
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../../upload';
// utils
import { fData } from '../../../../../utils/formatNumber';

const getInitialValues = (event) => {
  const _event = {
    Id: null,
    NickName: '',
    Email: '',
    IdNum: '',
    PhoneNumber: '',
    Gender: '',
    Cost: '',
    LicenseTypeId: '',
    IsActive: true,
    avatarUrl: null
  };

  if (event !== null) {
    if (event.Id != undefined) {
      _event.photoURL = `${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${event.Id}&AttatchmentTypeId=0`;
      _event.IsActive = event.IsActive;
    }

    const _newEevent = merge({}, _event, event);
    return _newEevent;
  }
  return _event;
};
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
AccountGeneral.propTypes = {
  schoolData: PropTypes.object
};
export default function AccountGeneral({ schoolData }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadFile, SetUploadFile] = useState();

  const { licenseTypeForSelect } = useSelector((state) => state.school);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLicenseTypeForSelect());
  }, [dispatch]);

  const SaveSchoolSchema = Yup.object().shape({
    NickName: Yup.string().max(255).required('حقل الاسم اجباري'),
    Email: Yup.string().max(255).required('حقل البريد الالكتروني اجباري'),
    IdNum: Yup.string().max(255).required('حقل رقم الهوية اجباري'),
    PhoneNumber: Yup.string().max(255).required('حقل رقم الهاتف اجباري'),
    Gender: Yup.string().max(255).required('حقل الجنس اجباري'),
    LicenseTypeId: Yup.string().max(255).required('حقل نوع الرخصة اجباري'),
    Cost: Yup.string().max(255).required('حقل سعر الرخصة اجباري'),
    avatarUrl: Yup.mixed().optional('صورة الموظف اجباري')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(schoolData),
    validationSchema: SaveSchoolSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);

      const newEvent = {
        NickName: values.NickName,
        Email: values.Email,
        DateOfBirth: '',
        IdNum: values.IdNum,
        Cost: values.Cost,
        LicenseTypeId: values.LicenseTypeId,
        PhoneNumber: values.PhoneNumber,
        Gender: values.Gender,
        IsActive: values.IsActive,
        SchoolProfileId: 1
      };

      if (schoolData?.Id) {
        newEvent.Id = schoolData?.Id;
        newEvent.UserId = schoolData?.UserId;
        try {
          newEvent.DateOfBirth = values.DateOfBirth?.toLocaleDateString('en-GB');
        } catch {
          newEvent.DateOfBirth = schoolData.DateOfBirth;
        }
      } else {
        newEvent.DateOfBirth = values.DateOfBirth
          ? values.DateOfBirth?.toLocaleDateString('en-GB')
          : new Date().toLocaleDateString('en-GB');
      }
      // console.log('newEvent', newEvent);
      try {
        dispatch(saveSchooStudent(newEvent, uploadFile));
        enqueueSnackbar('Update success', { variant: 'success' });
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        SetUploadFile(file);

        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );
  const genderSelectList = [
    { Id: 1, Label: 'ذكر' },
    { Id: 2, Label: 'أنثى' }
  ];
  const licenseTypeHandleChange = (e) => {
    setFieldValue('LicenseTypeId', e.target.value);
    const LicenseType = licenseTypeForSelect?.filter((item) => item.Id == e.target.value)[0];
    setFieldValue('Cost', LicenseType.Value);
  };

  return (
    <FormikProvider value={formik} autoComplete="off">
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center', height: '100%' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
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
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>

              <FormControlLabel
                control={<Switch checked={values.IsActive} {...getFieldProps('IsActive')} color="primary" />}
                labelPlacement="start"
                label="الحالة"
                sx={{ mt: 5 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
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
                  <TextField
                    select
                    fullWidth
                    label="نوع الرخصة"
                    placeholder="نوع الرخصة"
                    {...getFieldProps('LicenseTypeId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.LicenseTypeId && errors.LicenseTypeId)}
                    helperText={touched.LicenseTypeId && errors.LicenseTypeId}
                    onChange={(e) => {
                      licenseTypeHandleChange(e);
                    }}
                  >
                    <option value="" />
                    {licenseTypeForSelect?.map((option) => (
                      <option key={option.Id} value={option.Id} onClick={(e) => {}}>
                        {option.Label}
                      </option>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="سعر الرخصة"
                    {...getFieldProps('Cost')}
                    error={Boolean(touched.Cost && errors.Cost)}
                    helperText={touched.Cost && errors.Cost}
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
                    label="رقم الهاتف"
                    {...getFieldProps('PhoneNumber')}
                    error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
                    helperText={touched.PhoneNumber && errors.PhoneNumber}
                  />
                </Stack>
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  حفظ التعديلات
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
