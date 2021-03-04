import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { API, LSTOKEN } from 'src/utils/environmets';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { updateMe } from 'src/redux/actions/users';
import CustomSnackbar from 'src/components/Alert';

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min('2')
    .max('50'),
  lastname: Yup.string()
    .min('2')
    .max('50'),
  email: Yup.string().email('Invalid email')
});

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({
  name,
  lastname,
  userRole,
  email,
  className,
  updateMe,
  isLoad,
  isShow,
  alertStatus
}) => {
  const classes = useStyles();

  const [roles, setRoles] = useState([]);
  const [loadRoles, setLoadRoles] = useState(false);
  
  useEffect(() => {
    getRoles();
  }, []);

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

  return (
    <div>
    <Formik
      className={clsx(classes.root, className)}
      initialValues={{
        name: name,
        lastname: lastname,
        email: email,
        role: '',
      }}
      validationSchema={ProfileSchema}
      onSubmit={values => {
        updateMe(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values
      }) => (
        <Form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="name"
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastname"
                    error={Boolean(touched.lastname && errors.lastname)}
                    helperText={touched.lastname && errors.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.lastname}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  {loadRoles && (
                    <TextField
                      fullWidth
                      label="Select Role"
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      select
                      value={values.role}
                      SelectProps={{ native: true }}
                      variant="outlined"
                    >
                      <option disabled value={userRole} />
                      {roles.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  )}
                </Grid>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={isLoad}
                  >
                    Save Profile
                  </Button>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Form>
      )}
      
    </Formik>
    <CustomSnackbar open={isShow} status={alertStatus} text={ alertStatus ? 'Successfully updated!' : 'Oops, retry again...'} />
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isLoad: state.users.isLoad,
    isShow: state.alert.isShow,
    alertStatus: state.alert.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMe: (values) => {
      dispatch(updateMe(values));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
