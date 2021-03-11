import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { getCompany } from 'src/redux/actions/companies';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { API } from 'src/utils/environmets';
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
  paper: {
    padding: theme.spacing(0),
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

  const onImageChange = event => {
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    getCompany(company);
  }, []);

  return (
    <Page className={classes.root} title="Companies">
      <Container maxWidth={false}>
          <Paper className={classes.paper}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={onImageChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture">
                  <Avatar variant="square" className={classes.large} alt={props.company.name} src={`${API}/storage/companies/${props.company.logo}`} />
                </IconButton>
              </label>
            <Typography variant="h2">{props.company.name}</Typography>
            <TextField
              fullWidth
              label="Content"
            />
            <Input
              placeholder="URL Order"
              inputProps={{ 'aria-label': 'description' }}
            />
          </Paper>
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
