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
  }
}));

const Company = props => {
  const classes = useStyles();

  // const [logo, setLogo] = useState('');

  const { match, getCompany } = props;

  const company = match.params.slug;

  /*const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  });*/

  /*const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };*/

  useEffect(() => {
    getCompany(company);
  }, []);

  return (
    <Page className={classes.root} title="Companies">
      <Container className={classes.container}>
            <IconButton color="primary" aria-label="upload picture">
              <Avatar variant="square" className={classes.large} alt={props.company.name} src={`${API}/storage/companies/${props.company.logo}`} />
            </IconButton>
            <Typography variant="h2">{props.company.name}</Typography>
            <Box mt={3}>
            { props.company.insurances.length !== 0 ? (
            <Grid container spacing={3}>
              { props.company.insurances.map( insurance => (
                <Insurances key={insurance.id} />
              ))}
              </Grid>
            )
            :
            <Empty title="Insurances" />
            }
            </Box>
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
    </Page>
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
