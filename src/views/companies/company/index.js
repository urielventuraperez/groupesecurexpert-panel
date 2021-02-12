import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { getCompany } from 'src/redux/actions/companies';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { TextEditor } from 'src/components/TextEditor';

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

  const onImageChange = (event) => {
    console.log(event.target.files[0]);
  }

  useEffect(() => {
    getCompany(company);
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
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
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                >
                  <Avatar alt={props.company.name} src={props.company.image} />
                </IconButton>
              </label>
            </div>
            <Typography variant="h2">{props.company.name}</Typography>
      <TextField
        fullWidth
        label="Content"
        InputProps={{
          inputComponent: TextEditor,
        }}
      />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
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
