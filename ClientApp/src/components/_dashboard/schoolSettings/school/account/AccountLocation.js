import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useCallback, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { merge } from 'lodash';
import PropTypes from 'prop-types';

// material
import { Box, Card, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import {
  getCityForSelect,
  getCountryForSelect,
  getGovernorateForSelect
} from '../../../../../redux/slices/generalSetting';
// hooks
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------
const getInitialValues = (event) => {
  const _event = {
    Id: null,
    CountryId: '',
    CityId: '',
    GovernorateId: '',
    Latitude: '',
    Longitude: '',
    Address: ''
  };
  if (event !== null) {
    const _newEevent = merge({}, _event, event);
    return _newEevent;
  }
  return _event;
};

AccountLocation.propTypes = {
  schoolData: PropTypes.object
};
export default function AccountLocation({ schoolData }) {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { countryForSelect, cityForSelect, governorateForSelect } = useSelector((state) => state.generalSetting);

  useEffect(() => {
    dispatch(getCountryForSelect());
  }, [dispatch]);

  const SaveSchema = Yup.object().shape({
    CountryId: Yup.string().max(255).required('حقل الدولة اجباري'),
    CityId: Yup.string().max(255).required('حقل المدينة اجباري'),
    GovernorateId: Yup.string().max(255).required('حقل المحافظة اجباري'),
    Latitude: Yup.string().max(255).optional('حقل  خط العرض اختياري'),
    Longitude: Yup.string().max(255).optional('حقل  خط الطول اختياري'),
    Address: Yup.string().max(255).optional('حقل العنوان اختياري')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(schoolData),

    validationSchema: SaveSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
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

  const countryHandleChange = (e) => {
    setFieldValue('CountryId', e.target.value);
    setFieldValue('CityId', '');
    setFieldValue('GovernorateId', '');
    dispatch(getCityForSelect(e.target.value));
  };

  const cityHandleChange = (e) => {
    setFieldValue('CityId', e.target.value);
    setFieldValue('GovernorateId', '');
    dispatch(getGovernorateForSelect(e.target.value));
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            {/* begin location seaction */}
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {countryForSelect && (
                <TextField
                  select
                  fullWidth
                  label="الدولة"
                  placeholder="الدولة"
                  {...getFieldProps('CountryId')}
                  SelectProps={{ native: true }}
                  onChange={(e) => countryHandleChange(e)}
                  error={Boolean(touched.CountryId && errors.CountryId)}
                  helperText={touched.CountryId && errors.CountryId}
                >
                  <option value="" />
                  {countryForSelect?.map((option) => (
                    <option key={option.Id} value={option.Id}>
                      {option.Label}
                    </option>
                  ))}
                </TextField>
              )}

              <TextField
                select
                fullWidth
                label="المدينة"
                placeholder="المدينة"
                {...getFieldProps('CityId')}
                SelectProps={{ native: true }}
                onChange={(e) => cityHandleChange(e)}
                error={Boolean(touched.CityId && errors.CityId)}
                helperText={touched.CityId && errors.CityId}
              >
                <option value="" />
                {cityForSelect?.map((option) => (
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
                label="المحافظة"
                placeholder="المحافظة"
                {...getFieldProps('GovernorateId')}
                SelectProps={{ native: true }}
                error={Boolean(touched.GovernorateId && errors.GovernorateId)}
                helperText={touched.GovernorateId && errors.GovernorateId}
              >
                <option value="" />

                {governorateForSelect?.map((option) => (
                  <option key={option.Id} value={option.Id}>
                    {option.Label}
                  </option>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="العنوان"
                {...getFieldProps('Address')}
                error={Boolean(touched.Address && errors.Address)}
                helperText={touched.Address && errors.Address}
              />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="خط الطول"
                {...getFieldProps('Longitude')}
                error={Boolean(touched.Longitude && errors.Longitude)}
                helperText={touched.Longitude && errors.Longitude}
              />
              <TextField
                fullWidth
                label="خط العرض"
                {...getFieldProps('Latitude')}
                error={Boolean(touched.Latitude && errors.Latitude)}
                helperText={touched.Latitude && errors.Latitude}
              />
            </Stack>
            {/* end location seaction */}
          </Stack>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              حفظ التعديلات
            </LoadingButton>
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
}
