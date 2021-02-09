import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.blue[700]
    },
    secondary: {
      main: colors.amber[300]
    },
    text: {
      primary: colors.blueGrey[700],
      secondary: colors.blueGrey[500]
    }
  },
  shadows,
  typography
});

export default theme;
