import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import generatePassword from 'src/utils/passwordGenerator';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { API, LSTOKEN } from 'src/utils/environmets';
import CustomSnackbar from 'src/components/Alert';

const useStyles = makeStyles({
  root: {}
});

const Password = ({ className, ...rest }) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [newUserResponse, setNewUserResponse] = useState({
    status: '',
    message: '',
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  async function updatePassword(data) {
    let formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    let response = await fetch(`${API}/api/update/password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      },
      body: formData
    });

    let status = await response.json();
    setShowAlert(true);
    setNewUserResponse({
      message: status.message,
      status: status.status
    });
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  return (
    <div>
    <Formik
      initialValues={{
        current_password: '',
        new_password: '',
      }}
      validationSchema={Yup.object().shape({
        new_password: Yup.string()
          .max(55)
          .required('New password is required'),
        current_password: Yup.string()
          .min(8)
          .max(55)
          .required('Password is required'),
      })}
      onSubmit={(values,{resetForm}) => {
        updatePassword(values);
        resetForm()
      }}
    >
      {({
        errors,
        isValid,
        dirty,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className={clsx(classes.root, className)} {...rest}>
          <Card>
            <CardHeader subheader="Update password" title="Password" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="current_password"
                onChange={handleChange}
                type="password"
                value={values.current_password}
                variant="outlined"
              />
              <OutlinedInput
                error={Boolean(touched.password && errors.password)}
                fullWidth
                name="new_password"
                placeholder="New Password"
                onBlur={handleBlur}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                value={values.new_password}
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
                    <IconButton
                      onClick={() => {
                        setFieldValue('password', generatePassword(12));
                      }}
                    >
                      <LockTwoToneIcon color={'secondary'} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button type="submit" disabled={!(isValid && dirty)} color="primary" variant="contained">
                Update
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
    <CustomSnackbar open={ showAlert } status={ newUserResponse.status } text={ newUserResponse.message } close={()=>{ showAlert && setTimeout(()=>{(setShowAlert(false))},6000)}} />
    </div>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
