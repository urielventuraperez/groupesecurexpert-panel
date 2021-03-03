import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { ConnectedRouter } from 'connected-react-router';
import RenderRoutes from 'src/routes';
import MainLayout from 'src/layouts/MainLayout';
import { persistLogin } from 'src/redux/actions/auth';
import { me } from 'src/redux/actions/users';
import { connect } from 'react-redux';

const App = ({history, isLogged, persistLogin, me}) => {

  const isLoggedIn = isLogged ? true : false;

  useEffect(()=>{
    persistLogin();
    me()
  },[persistLogin])

  return (
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MainLayout isLogged={isLoggedIn} content = {RenderRoutes} />
      </ThemeProvider>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object,
  isLogged: PropTypes.bool,
  persistLogin: PropTypes.func,
  me: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    me: state.users.me
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    persistLogin: () => { dispatch(persistLogin()) },
    me: () => { dispatch(me()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
