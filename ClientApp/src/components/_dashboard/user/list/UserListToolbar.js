import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  Button,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeholder: PropTypes.string,
  handleDelete: PropTypes.func,
  hideFilterList: PropTypes.number,
  hasAddBtn: PropTypes.number,
  handleClickAddEvent: PropTypes.func
};

export default function UserListToolbar({
  numSelected,
  filterName,
  onFilterName,
  placeholder,
  handleDelete,
  hideFilterList,
  hasAddBtn,
  handleClickAddEvent
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const Content = () => {
    let content;

    if (numSelected > 0) {
      content = (
        <Tooltip title="حذف">
          <IconButton onClick={() => handleDelete()}>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      );
    } else if (hasAddBtn == 1) {
      content = (
        <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={() => handleClickAddEvent()}>
          إضافة
        </Button>
      );
    } else if (hideFilterList == 1) {
      content = <></>;
    } else {
      content = (
        <Tooltip title="قائمة الفلاتر">
          <IconButton>
            <Icon icon={roundFilterList} />
          </IconButton>
        </Tooltip>
      );
    }
    return content;
  };
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} محدد
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder ? `${placeholder}` : 'ابحث ...'}
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      <Content />
    </RootStyle>
  );
}
