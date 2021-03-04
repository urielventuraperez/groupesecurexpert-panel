import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Page from 'src/components/Page';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import generatePassword from 'src/utils/passwordGenerator';
import { API, LSTOKEN } from 'src/utils/environmets';
import CustomSnackbar from 'src/components/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);

  const [roles, setRoles] = React.useState([]);
  const [loadRoles, setLoadRoles] = React.useState(false);
  const [newUserResponse, setNewUserResponse] = React.useState({
    status: '',
    message: '',
  });

  const [showAlert, setShowAlert] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  async function getRoles() {
    let response = await fetch(`${API}/api/roles`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    });
    if (response.status) {
      let getRoles = await response.json();
      setLoadRoles(true);
      setRoles(getRoles.data);
    }
  }

  async function saveUser(data) {
    let formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    let response = await fetch(`${API}/api/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      },
      body: formData
    })

    let status = await response.json();
    setShowAlert(true);
    setNewUserResponse({
      message: status.message,
      status: status.status
    });
    setTimeout(()=>{setShowAlert(false)}, 5000)
  }

  React.useEffect(() => {
    getRoles();
  }, []);

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              name: '',
              last_name: '',
              password: '',
              role_id: '1'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              name: Yup.string()
                .max(255)
                .required('First name is required'),
              last_name: Yup.string()
                .max(255)
                .required('Last name is required'),
              password: Yup.string()
                .max(255)
            })}
            onSubmit={values => {
              saveUser(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your ADMIN account to create a system user.
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="last_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                {loadRoles && (
                    <TextField
                      fullWidth
                      label="Select Role"
                      name="role_id"
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                      value={values.role}
                      SelectProps={{ native: true }}
                      variant="outlined"
                    >
                      {roles.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  )}
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <OutlinedInput
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  name="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      <IconButton onClick={ () => { setFieldValue('password', generatePassword(12)) } }>
                        <LockTwoToneIcon color={'secondary'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Register
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <CustomSnackbar open={ showAlert } status={ newUserResponse.status } text={ newUserResponse.message } close={()=>{ showAlert && setTimeout(()=>{(setShowAlert(false))},6000)}} />
    </Page>
  );
};

export default RegisterView;
