import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import { API } from 'src/utils/environmets';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const CompanySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(10000, 'Too Long!')
    .required('Required'),
  quote: Yup.string()
    .min(5, 'Too Short!')
    .max(550, 'Too Long!'),
  order_url: Yup.string()
    .min(5, 'Too Short!')
    .max(300, 'Too Long!')
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  input: {
    display: 'none'
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
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

const CompanyForm = props => {
  const classes = useStyles();
  const { company } = props;
  return (
    <div key={1}>
      <Formik
        initialValues={{
          name: company.name,
          description: company.description,
          quote: company.quote,
          order_url: company.order_url
        }}
        validationSchema={CompanySchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl fullWidth className={clsx(classes.flexContainer)}>
              {
                company.logo &&
                <IconButton
                className={classes.flexContainerItem}
                color="primary"
                aria-label="upload picture"
              >
                <Avatar
                  variant="square"
                  className={classes.large}
                  alt={company.name}
                  src={`${API}/storage/companies/${company.logo}`}
                />
              </IconButton>
              }
              <TextField
                label="Company Name"
                className={clsx(classes.margin, classes.flexContainerItem)}
                variant="outlined"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
              <TextField
                className={clsx(classes.margin, classes.flexContainerItem)}
                variant="outlined"
                label="Company Order Website"
                name="order_url"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order_url}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                multiline
                rows={5}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Quote"
                name="quote"
                multiline
                variant="outlined"
                rows={4}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quote}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyForm;
