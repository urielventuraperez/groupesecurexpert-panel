import React, { useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CompanyCard from './CompanyCard';
import { getCompanies } from 'src/redux/actions/companies';
import { connect } from 'react-redux';
import Empty from 'src/components/Empty';
import CustomSnackbar from 'src/components/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  companyCard: {
    height: '100%'
  }
}));

const CompaniesListView = props => {
  const { getCompanies, companies, filterCompanies } = props;

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const classes = useStyles();

  return (
    <Page className={classes.root} title="Companies">
      <Container maxWidth={false}>
        <Toolbar />
        { Array.isArray(companies) && companies.length ? (
          <div>
            <Box mt={3}>
              <Grid container spacing={3}>
                {filterCompanies.length === 0
                  ? companies.map(company => (
                      <Grid item key={company.id} lg={4} md={6} xs={12}>
                        <CompanyCard
                          className={classes.productCard}
                          product={company}
                        />
                      </Grid>
                    ))
                  : filterCompanies.map(company => (
                      <Grid item key={company.id} lg={4} md={6} xs={12}>
                        <CompanyCard
                          className={classes.productCard}
                          product={company}
                        />
                      </Grid>
                    ))}
              </Grid>
            </Box>
          </div>
        ) : (
          <Empty title="company" />
        )}
      </Container>
      <CustomSnackbar open={props.isShow} status={props.alertStatus} text={ props.alertStatus ? 'Successfully executed!' : 'Oops, retry again...'} />
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    companies: state.companies.companies,
    isLoadCompanies: state.companies.isLoadCompanies,
    filterCompanies: state.companies.companiesResult,
    isShow: state.alert.isShow,
    alertStatus: state.alert.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompanies: () => {
      dispatch(getCompanies());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesListView);
