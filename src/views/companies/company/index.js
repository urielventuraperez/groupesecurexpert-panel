import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { getCompany } from 'src/redux/actions/companies';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { TextEditor } from 'src/components/TextEditor';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/Add';
import Deductibles from './deductible';
import Details from './detail';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  input: {
    display: 'none'
  }
}));

const Company = props => {
  const classes = useStyles();

  // const [logo, setLogo] = useState('');

  const { match, getCompany } = props;

  const company = match.params.slug;

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onImageChange = event => {
    console.log(event.target.files[0]);
  };

  useEffect(() => {
    getCompany(company);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <div className={classes.root}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={onImageChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture">
                  <Avatar alt={props.company.name} src={props.company.image} />
                </IconButton>
              </label>
            </div>
            <Typography variant="h2">{props.company.name}</Typography>
            <TextField
              fullWidth
              label="Content"
              InputProps={{
                inputComponent: TextEditor
              }}
            />
            <Input
              placeholder="URL Order"
              inputProps={{ 'aria-label': 'description' }}
            />
          </Paper>
          <Paper>
            <Details />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
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
        </Grid>
      </Grid>
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
