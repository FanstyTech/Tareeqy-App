import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        لا يوجد نتائج
      </Typography>
      <Typography variant="body2" align="center">
        لا يوجد نتائج ل &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. حاول التحقق من الأخطاء المطبعية أو استخدام كلمات كاملة.
      </Typography>
    </Paper>
  );
}
