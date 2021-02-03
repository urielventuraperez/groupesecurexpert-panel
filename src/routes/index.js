import React from 'react';
import { Route, Switch, Redirect  } from 'react-router';
// import DashboardLayout from 'src/layouts/DashboardLayout';
// import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import CompaniesListView from 'src/views/companies/CompaniesListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

const RenderRoutes = (
  <Switch>
    <Route exact path='/' component={DashboardView} />
    <Route exact path='/app/dashboard' component={DashboardView}></Route>
    <Route exact path='/app/account' component={AccountView}></Route>
    <Route exact path='/app/customers' component={CustomerListView}></Route>
    <Route exact path='/app/companies' component={CompaniesListView}></Route>
    <Route exact path='/app/settings' component={SettingsView}></Route>
    <Route exact path='/login' component={LoginView}></Route>
    <Route exact path='/register' component={RegisterView}></Route>
    {/* Rutas para los not found */}
    <Route exact path="/not-found" component={NotFoundView} />
    <Route exact path="*">
      <Redirect to="/not-found" />
    </Route>
  </Switch>
);

export default RenderRoutes;
