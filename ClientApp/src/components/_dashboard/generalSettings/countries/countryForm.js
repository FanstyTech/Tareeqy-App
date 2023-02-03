import { useCallback } from 'react';

import { merge } from 'lodash';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';

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
import { LoadingButton } from '@material-ui/lab';
//
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
const getInitialValues = (event, range) => {
  const _event = {
    name: '',
    code: '',
    status: false,
    currency: '',
    avatarUrl: null,
    textColor: '#1890FF'
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};
// ----------------------------------------------------------------------

CountryForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};
export default function CountryForm({ event, range, onCancel }) {
  const isCreating = !event;
  const handleDelete = async () => {
    try {
      onCancel();
      // dispatch(deleteEvent(event.id));
      // enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };
  const EventSchema = Yup.object().shape({
    name: Yup.string().max(255).required('حقل الاسم اجباري'),
    code: Yup.string().max(255).required('حقل الرمز اجباري'),
    currency: Yup.string().max(255).required('حقل العملة اجباري'),
    avatarUrl: Yup.mixed().required('العلم اجباري'),

    end: Yup.date().when(
      'start',
      (start, schema) => start && schema.min(start, 'End date must be later than start date')
    ),
    start: Yup.date()
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          name: values.name,
          code: values.code,
          currency: values.currency,
          avatarUrl: values.avatarUrl,
          status: values.status
        };

        console.log('newEvent', newEvent);
        if (event) {
          // dispatch(updateEvent(event.id, newEvent));
          // enqueueSnackbar('Update event success', { variant: 'success' });
        } else {
          // dispatch(createEvent(newEvent));
          // enqueueSnackbar('Create event success', { variant: 'success' });
        }
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
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );
  const currency = [
    { id: '1', label: 'شيكل' },
    { id: '2', label: 'دولار' }
  ];
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
          <TextField
            fullWidth
            label="الاسم"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            label="الرمز"
            {...getFieldProps('code')}
            error={Boolean(touched.code && errors.code)}
            helperText={touched.code && errors.code}
          />
          <TextField
            select
            fullWidth
            label="العملة"
            placeholder="العملة"
            {...getFieldProps('currency')}
            SelectProps={{ native: true }}
            error={Boolean(touched.currency && errors.currency)}
            helperText={touched.currency && errors.currency}
          >
            <option value="" />
            {currency.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>

          <FormControlLabel control={<Switch checked={values.status} {...getFieldProps('status')} />} label="الحالة" />
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
            إضافة
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
