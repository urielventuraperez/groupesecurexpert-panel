import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Container from '@material-ui/core/Container';
import { Box, Grid } from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { getCompany } from 'src/redux/actions/companies';
import { connect } from 'react-redux';
import { API } from 'src/utils/environmets';
import Insurances from './insurances';
import Empty from 'src/components/Empty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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
              <FormControl fullWidth className={clsx(classes.flexContainer)}>
              <IconButton className={classes.flexContainerItem} color="primary" aria-label="upload picture">
                <Avatar
                  variant="square"
                  className={classes.large}
                  alt={company.name}
                  src={`${API}/storage/companies/${company.logo}`}
                />
              </IconButton>
              <TextField 
                id="standard-required" 
                label="Company Name" 
                className={clsx(classes.margin, classes.flexContainerItem)}
                variant="outlined"
                defaultValue={company.name} />
              <TextField 
                id="standard-required-url" 
                className={clsx(classes.margin, classes.flexContainerItem)}
                variant="outlined"
                label="Company Order Website" 
                defaultValue={company.order_url} />
              </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                id="standard-multiline-static"
                label="Description"
                variant="outlined"
                multiline
                rows={5}
                defaultValue={company.description}
              />
              </FormControl>
              <FormControl fullWidth className={classes.margin}>
              <TextField
                id="standard-multiline-static"
                label="Quote"
                multiline
                variant="outlined"
                rows={4}
                defaultValue={company.quote}
              />
              </FormControl>
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
