import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { getCompany } from 'src/redux/actions/companies';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));
const Company = (props) => {
  const classes = useStyles();

  const { match, getCompany } = props;

  const company = match.params.slug;

  useEffect(()=>{
    getCompany(company);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Typography>{props.company.name}</Typography>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoad: state.companies.isLoadCompanies,
    company: state.companies.company
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompany: (id) => {
      dispatch(getCompany(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);