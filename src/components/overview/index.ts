/* eslint-disable import/no-extraneous-dependencies */
import { makeStyles } from '@mui/styles';

// a sueStyles hook using the makeStyles.
// custmozie material ui select, background: red, border: none

const useStyles = makeStyles({
  root: {
    background: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    '.MuiSelect-outlined': {
      border: '1px solid transparent',
    },
    '.MuiOutlinedInput-root': {
      border: '1px solid transparent',
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid transparent',
      borderRadius: '5px 5px 0 0',
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.01)',
      border: '1px solid rgba(0, 0, 0, 0.01)',
    },
  },
});

export { useStyles };
