import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Container from '@material-ui/core/Container';
import { Box, Grid } from '@material-ui/core/';
import { getCompany } from 'src/redux/actions/companies';
import { connect } from 'react-redux';
import Insurances from './insurances';
import Empty from 'src/components/Empty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CompanyForm from './form';

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
    },
  },
  flexContainerItem: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1)
    },
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

  useEffect(() => {
    getCompany(id);
  }, [getCompany]);

  return (
    <div>
      {!isLoad ? (
        <Page className={classes.root} title={`${company.name}`}>
          <Container className={classes.container}>
            <Grid>
              <CompanyForm company={company} />
            </Grid>
            {Array.isArray(company.insurances) && company.insurances.length ? (
              <Box mt={5}>
                <Grid container spacing={2}>
                  {company.insurances.map(insurance => (
                    <Grid key={insurance.id} item>
                      <Insurances name={insurance.name} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Empty title={'Insurances'} />
            )}
          </Container>
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            className={classes.extendedIcon}
          >
            <AddIcon className={classes.margin} />
            Add Insurance
          </Fab>
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
