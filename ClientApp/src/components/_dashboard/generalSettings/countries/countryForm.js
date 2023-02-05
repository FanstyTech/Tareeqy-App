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
import { LoadingButton } from '@material-ui/lab';
// redux
import { useDispatch } from '../../../../redux/store';
import { saveCountryEvent } from '../../../../redux/slices/generalSetting';

//
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
const getInitialValues = (event) => {
  const _event = {
    Id: null,
    Name: '',
    Code: '',
    IsActive: false,
    Currency: '',
    avatarUrl: null,
    textColor: '#1890FF'
  };
  if (event !== null) {
    // _event.Code = event.Code;
    // _event.Name = event.Name;
    // _event.IsActive = true;
    // _event.Currency = event.Currency;
    _event.avatarUrl = `${process.env.REACT_APP_LOCAL_BASE_URl}Attachment/AttachmentDownload?PrimeryTableId=${event.Id}&AttatchmentTypeId=1`;
    const _newEevent = merge({}, _event, event);
    _newEevent.Currency = event.Currency.Id;
    return _newEevent;
  }
  return _event;
};
// ----------------------------------------------------------------------

CountryForm.propTypes = {
  event: PropTypes.object,
  currenciesSelectList: PropTypes.array,
  onCancel: PropTypes.func,
  handleDelete: PropTypes.func
};
export default function CountryForm({ event, onCancel, handleDelete, currenciesSelectList }) {
  const isCreating = !event;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadFile, SetUploadFile] = useState();

  const EventSchema = Yup.object().shape({
    Name: Yup.string().max(255).required('حقل الاسم اجباري'),
    Code: Yup.string().max(255).required('حقل الرمز اجباري'),
    Currency: Yup.string().max(255).required('حقل العملة اجباري'),
    avatarUrl: Yup.mixed().required('العلم اجباري')
  });

  const formik = useFormik({
    initialValues: getInitialValues(event),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          Id: values.Id,
          Name: values.Name,
          Code: values.Code,
          CurrencyId: values.Currency,
          avatarUrl: uploadFile,
          IsActive: values.IsActive
        };

        if (event) {
          dispatch(saveCountryEvent(newEvent));
          enqueueSnackbar('تمت العملية بنجاح', { variant: 'success' });
        } else {
          dispatch(saveCountryEvent(newEvent));
          enqueueSnackbar('تمت العملية بنجاح', { variant: 'success' });
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
          <TextField
            fullWidth
            label="الاسم"
            {...getFieldProps('Name')}
            error={Boolean(touched.Name && errors.Name)}
            helperText={touched.Name && errors.Name}
          />
          <TextField
            fullWidth
            label="الرمز"
            {...getFieldProps('Code')}
            error={Boolean(touched.Code && errors.Code)}
            helperText={touched.Code && errors.Code}
          />
          <TextField
            select
            fullWidth
            label="العملة"
            placeholder="العملة"
            {...getFieldProps('Currency')}
            SelectProps={{ native: true }}
            error={Boolean(touched.Currency && errors.Currency)}
            helperText={touched.Currency && errors.Currency}
          >
            <option value="" />
            {currenciesSelectList?.map((option) => (
              <option key={option.Id} value={option.Id}>
                {option.Label}
              </option>
            ))}
          </TextField>

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
            إضافة
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
