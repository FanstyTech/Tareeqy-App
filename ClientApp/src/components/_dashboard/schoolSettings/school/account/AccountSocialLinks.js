import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import whatsAppLink from '@iconify/icons-ant-design/whats-app';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

// material
import { Stack, Card, TextField, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// redux
import { useDispatch } from '../../../../../redux/store';
import { saveSchoolProfile } from '../../../../../redux/slices/school';
// hooks
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';

// utils
import fakeRequest from '../../../../../utils/fakeRequest';

// ----------------------------------------------------------------------
const getInitialValues = (event) => {
  const _event = {
    Id: null,
    FacebookPageURL: '',
    InstagramPageURL: '',
    LinkedinPageURL: '',
    TwitterPageURL: '',
    WhatsAppNumber: ''
  };
  if (event !== null) {
    const _newEevent = merge({}, _event, event);
    return _newEevent;
  }
  return _event;
};
const SOCIAL_LINKS_OPTIONS = [
  {
    value: 'FacebookPageURL',
    label: 'رابط حساب الفيس بوك',
    icon: <Icon icon={facebookFill} height={24} />
  },
  {
    value: 'InstagramPageURL',
    label: 'رابط حساب انستغرام',

    icon: <Icon icon={instagramFilled} height={24} />
  },
  {
    value: 'WhatsAppNumber',
    label: 'رابط حساب الواتس اب',

    icon: <Icon icon={whatsAppLink} height={24} />
  },
  {
    value: 'LinkedinPageURL',
    label: 'رابط حساب لينكد ان',

    icon: <Icon icon={linkedinFill} height={24} />
  },
  {
    value: 'TwitterPageURL',
    label: 'رابط حساب توتير',
    icon: <Icon icon={twitterFill} height={24} />
  }
];

// ----------------------------------------------------------------------
AccountSocialLinks.propTypes = {
  schoolData: PropTypes.object
};
export default function AccountSocialLinks({ schoolData }) {
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(schoolData),
    onSubmit: async (values, { setSubmitting }) => {
      const newEvent = {
        FacebookPageURL: values.FacebookPageURL ? values.FacebookPageURL : '',
        InstagramPageURL: values.InstagramPageURL ? values.InstagramPageURL : '',
        LinkedinPageURL: values.LinkedinPageURL ? values.LinkedinPageURL : '',
        TwitterPageURL: values.TwitterPageURL ? values.TwitterPageURL : '',
        WhatsAppNumber: values.WhatsAppNumber ? values.WhatsAppNumber : '',
        Id: schoolData?.Id
      };
      try {
        dispatch(saveSchoolProfile(newEvent));
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      }
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {SOCIAL_LINKS_OPTIONS.map((link) => (
              <TextField
                key={link.value}
                fullWidth
                label={link.label}
                {...getFieldProps(link.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>
                }}
              />
            ))}

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              حفظ التعديلات
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
