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
import { LoadingButton, MobileDateTimePicker } from '@material-ui/lab';

// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getAgreementForSelect, getCurrenciesSelectList } from '../../../../../redux/slices/generalSetting';
// hooks
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../../upload';
// utils
import { fData } from '../../../../../utils/formatNumber';

const getInitialValues = (event) => {
  const _event = {
    Id: null,
    NameL: '',
    NameF: '',
    LicensedOperatorNumber: '',
    AgreementPrice: '',
    AgreementId: '',
    ContactNumber: '',
    CurrencyId: '',
    IsActive: false,
    photoURL: null
  };
  if (event !== null) {
    const _newEevent = merge({}, _event, event);
    return _newEevent;
  }
  return _event;
};
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
AccountGeneral.propTypes = {
  schoolData: PropTypes.object,
  setSchoolData: PropTypes.func
};
export default function AccountGeneral({ schoolData, setSchoolData }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadFile, SetUploadFile] = useState();

  const { agreementForSelect, currenciesSelectList } = useSelector((state) => state.generalSetting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgreementForSelect());
    dispatch(getCurrenciesSelectList());
  }, [dispatch]);

  const SaveSchoolSchema = Yup.object().shape({
    NameL: Yup.string().max(255).required('حقل الاسم بالعربية اجباري'),
    NameF: Yup.string().max(255).required('حقل الاسم بالانجليزية اجباري'),
    LicensedOperatorNumber: Yup.string().max(255).required('حقل رقم المشتغل المرخص اجباري'),
    AgreementPrice: Yup.string().max(255).required('حقل سعر الاتفاقية اجباري'),
    AgreementId: Yup.string().max(255).required('حقل الاتفاقية اجباري'),
    photoURL: Yup.mixed().required('شعار المدرسة اجباري'),
    ContactNumber: Yup.string().max(255).required('حقل رقم التواصل اجباري'),
    CurrencyId: Yup.string().max(255).required('حقل العملة اجباري')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(schoolData),
    validationSchema: SaveSchoolSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const newEvent = {
        Id: 10
      };
      setSchoolData(newEvent);
      try {
        //  await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
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
  const agreementHandleChange = (e) => {
    setFieldValue('AgreementId', e.target.value);
    const agreement = agreementForSelect?.filter((item) => item.Id == e.target.value)[0];
    setFieldValue('AgreementPrice', agreement.Value);
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
                control={<Switch {...getFieldProps('IsActive')} color="primary" />}
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
                    label="الاسم بالعربية"
                    {...getFieldProps('NameL')}
                    error={Boolean(touched.NameL && errors.NameL)}
                    helperText={touched.NameL && errors.NameL}
                  />
                  <TextField
                    fullWidth
                    label="الاسم بالانجليزية"
                    {...getFieldProps('NameF')}
                    error={Boolean(touched.NameF && errors.NameF)}
                    helperText={touched.NameF && errors.NameF}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="رقم المشتغل المرخص"
                    {...getFieldProps('LicensedOperatorNumber')}
                    error={Boolean(touched.LicensedOperatorNumber && errors.LicensedOperatorNumber)}
                    helperText={touched.LicensedOperatorNumber && errors.LicensedOperatorNumber}
                  />
                </Stack>

                {/* begin agreement seaction */}

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="الاتفاقية"
                    placeholder="الاتفاقية"
                    {...getFieldProps('AgreementId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.AgreementId && errors.AgreementId)}
                    helperText={touched.AgreementId && errors.AgreementId}
                    onChange={(e) => {
                      agreementHandleChange(e);
                    }}
                  >
                    <option value="" />
                    {agreementForSelect?.map((option) => (
                      <option
                        key={option.Id}
                        value={option.Id}
                        onClick={(e) => {
                          console.log(e);
                        }}
                      >
                        {option.Label}
                      </option>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="سعر الاتفاقية"
                    {...getFieldProps('AgreementPrice')}
                    error={Boolean(touched.AgreementPrice && errors.AgreementPrice)}
                    helperText={touched.AgreementPrice && errors.AgreementPrice}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <MobileDateTimePicker
                    label="تاريخ بدء الاتفاقية"
                    value={values.start}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    onChange={(date) => setFieldValue('AgreementStartDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />

                  <MobileDateTimePicker
                    label="تاريخ انتهاء الاتفاقية"
                    value={values.end}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    onChange={(date) => setFieldValue('AgreementEndDate', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(touched.end && errors.end)}
                        helperText={touched.end && errors.end}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                </Stack>
                {/* end agreement seaction */}

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="العملة"
                    placeholder="العملة"
                    {...getFieldProps('CurrencyId')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.CurrencyId && errors.CurrencyId)}
                    helperText={touched.CurrencyId && errors.CurrencyId}
                    onChange={(e) => {
                      agreementHandleChange(e);
                    }}
                  >
                    <option value="" />
                    {currenciesSelectList?.map((option) => (
                      <option
                        key={option.Id}
                        value={option.Id}
                        onClick={(e) => {
                          console.log(e);
                        }}
                      >
                        {option.Label}
                      </option>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="رقم التواصل"
                    {...getFieldProps('ContactNumber')}
                    error={Boolean(touched.ContactNumber && errors.ContactNumber)}
                    helperText={touched.ContactNumber && errors.ContactNumber}
                  />
                </Stack>

                <TextField {...getFieldProps('Bio')} fullWidth multiline minRows={4} maxRows={4} label="حول المدرسة" />
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
