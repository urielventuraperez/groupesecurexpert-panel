import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Container from '@material-ui/core/Container';
import { Box, Grid } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { getCompany } from 'src/redux/actions/companies';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { API } from 'src/utils/environmets';
import Insurances from './insurances';
import Empty from 'src/components/Empty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import { TextEditor } from 'src/components/TextEditor';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import AddIcon from '@material-ui/icons/Add';
// import Deductibles from './deductible';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  input: {
    display: 'none'
  },
  large: {
    width: theme.spacing(20),
    height: 'auto'
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
}));

const Company = props => {
  const classes = useStyles();

  // const [logo, setLogo] = useState('');

  const { match, getCompany, company, isLoad } = props;

  const id = match.params.slug;

  /*const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  });*/

  /*const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };*/

  useEffect(() => {
    getCompany(id);
  }, [getCompany]);

  return (
    <div>
      {!isLoad ? (
        <Page className={classes.root} title={`${company.name}`}>
        <Container className={classes.container}>
          <Grid>
          <IconButton color="primary" aria-label="upload picture">
            <Avatar
              variant="square"
              className={classes.large}
              alt={company.name}
              src={`${API}/storage/companies/${company.logo}`}
            />
          </IconButton>
          <Typography variant="h2">{company.name}</Typography>
          </Grid>
          {Array.isArray(company.insurances) && company.insurances.length ? (
            <Box mt={5}>
            <Grid container spacing={2}>
              {
                company.insurances.map(insurance => 
                  <Grid key={insurance.id} item>
                    <Insurances name={insurance.name} />
                  </Grid>)
              }
            </Grid>
            </Box>
            ) : (
            <Empty title={'Insurances'} />
          )}
          {/* <Grid item xs={12} md={4}>
           <Paper className={classes.paper}>
            <Typography variant="h4">Deductibles</Typography>
            <Deductibles />
            <Input placeholder="Value" inputProps={{ 'aria-label': 'value' }} />
            <Input
              placeholder="Percentage"
              inputProps={{ 'aria-label': 'percentage' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Saving"
            />
            <IconButton aria-label="add deductible" size="small">
              <AddIcon fontSize="small" />
            </IconButton>
            </Paper> 
        </Grid> */}
        </Container>
        <Fab variant="extended" color="primary" aria-label="add" className={classes.extendedIcon}>
          <AddIcon className={classes.margin}/>
          Add Insurance
        </Fab>
        </Page>
      ) : 
      <CircularProgress     style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }} color="secondary" />
      }
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
