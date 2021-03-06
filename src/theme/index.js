import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.blueGrey[50],
    },
    primary: {
      main: colors.blue[700]
    },
    secondary: {
      main: '#d27619'
    },
    text: {
      primary: colors.blueGrey[700],
      secondary: colors.blueGrey[500],
      hint: colors.amber[50],
    },
    warning: {
      main: colors.deepOrange[500]
    }
  },
  shadows,
  typography
});

export default theme;
