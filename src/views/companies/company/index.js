import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Container from '@material-ui/core/Container';
import { Box, Grid } from '@material-ui/core/';
import { getCompany } from 'src/redux/actions/companies';
import { connect } from 'react-redux';
import Insurances from './insurance';
import Empty from 'src/components/Empty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import CompanyForm from './form';
import InsurancesForm from './formInsurance';
import { API, LSTOKEN } from 'src/utils/environmets';
import BackButton from 'src/components/BackButton';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary
  },
  grid: {
    padding: theme.spacing(3, 1)
  },
  input: {
    display: 'none'
  },
  large: {
    width: theme.spacing(20),
    height: 'auto'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  flexContainerItem: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1)
    }
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  extendedIcon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Company = props => {
  const classes = useStyles();

  const { match, getCompany, company, isLoad } = props;

  const id = match.params.slug;
  const [insurances, setInsurances] = useState([]);
  const [loadInsurances, setLoadInsurances] = useState(false);

  useEffect(() => {
    getCompany(id);
    getInsurances(id);
  }, [getCompany]);

  async function getInsurances(idCompany) {
    let response = await fetch(`${API}/api/company/${idCompany}/insurances`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    });
    if (response.status) {
      let getInsurances = await response.json();
      setLoadInsurances(true);
      setInsurances(getInsurances.data);
    }
  }

  return (
    <div>
      {!isLoad ? (
        <Page className={classes.root} title={`${company.name}`}>
          <Container className={classes.container}>
            <Grid className={classes.grid}>
              <CompanyForm company={company} />
            </Grid>

            <Divider variant="middle" />

            <Grid className={classes.grid}>
              <InsurancesForm 
                idCompany={company.id} 
                insurances={insurances} 
                loadInsurances={loadInsurances} />
              {Array.isArray(company.insurances) &&
              company.insurances.length ? (
                <Box mt={5}>
                  <Grid container spacing={2}>
                    {company.insurances.map(insurance => (
                      <Grid key={insurance.id} item>
                        <Insurances 
                          name={insurance.name}
                          createdAt={insurance.pivot.created_at} 
                          details={insurance.details}
                          idCompany={company.id} 
                          idInsurance={insurance.id} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Empty title={'Insurances'} />
              )}
            </Grid>
          </Container>
        </Page>
      ) : (
        <CircularProgress
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          color="secondary"
        />
      )}
      <BackButton history={props.history} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoad: state.companies.isLoadCompanies,
    company: state.companies.company
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompany: id => {
      dispatch(getCompany(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
