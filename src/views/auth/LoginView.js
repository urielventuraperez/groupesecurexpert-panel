import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
  .email('Invalid email')
  .required('Username is required'),
  password: Yup.string()
  .required('Password is required')
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://groupesecurexpert.ca/">
        Groupe Financier Sécurexpert
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 70,
    height: 70
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Page title="Login Page">
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Logo width={60} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={LoginSchema}
            onSubmit={
              values => {
                console.log(values)
              }
            }
          >
                    {({
              errors,
              isValid,
              dirty,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"              
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                margin="normal"
                values={values.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                values={values.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                disabled={!(isValid && dirty) || isSubmitting}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
    </Page>
  );
}
