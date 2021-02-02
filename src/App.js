import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { ConnectedRouter } from 'connected-react-router';
import RenderRoutes from 'src/routes';
import MainLayout from 'src/layouts/MainLayout';

const App = ({history}) => {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MainLayout content = {RenderRoutes} />
      </ThemeProvider>
    </ConnectedRouter>
  );
};

export default App;
