import React from 'react';
import { Route, Switch, Redirect  } from 'react-router';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import CompaniesListView from 'src/views/companies/CompaniesListView';
import CompanyView from 'src/views/companies/Company';
import InsuranceView from 'src/views/companies/Company/Details';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import FaqView from 'src/views/faq/FaqView';
import ProtectedRoutes from './protected';

const RenderRoutes = (
  <Switch>
    {/** Protected routes **/}
    <ProtectedRoutes exact path='/' component={DashboardView} />
    <ProtectedRoutes exact path='/app/dashboard' component={DashboardView} />
    <ProtectedRoutes exact path='/app/account' component={AccountView} />
    <ProtectedRoutes exact path='/app/customers' component={CustomerListView} />
    <ProtectedRoutes exact path='/app/companies' component={CompaniesListView} />
    <ProtectedRoutes exact path='/app/company/:slug' component={CompanyView} />
    <ProtectedRoutes exact path='/app/company/:idCompany/insurance' component={InsuranceView} />
    <ProtectedRoutes exact path='/app/settings' component={SettingsView} />
    <ProtectedRoutes exact path='/app/register' component={RegisterView} />
    <ProtectedRoutes exact path='/app/faq' component={FaqView} />
    {/** Public routes **/}
    <Route exact path='/login' component={LoginView}></Route>

    {/* Not found routes */}
    <Route exact path="/not-found" component={NotFoundView} />
    <Route exact path="*">
      <Redirect to="/not-found" />
    </Route>
  </Switch>
);

export default RenderRoutes;
