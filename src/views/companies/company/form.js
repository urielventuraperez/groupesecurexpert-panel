import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { API } from 'src/utils/environmets';
import { updateCompany } from 'src/redux/actions/companies';
import { connect } from 'react-redux';
import CustomSnackbar from 'src/components/Alert';

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

  
  const { company, updateCompany, isShow, alertStatus } = props;

  const [preview, setPreview] = React.useState();
  const [selectedFile, setSelectedFile] = React.useState('')

  React.useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  const onSelectedFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
  }
  setSelectedFile(e.target.files[0])
  }

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
          updateCompany(company.id, values);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl fullWidth className={clsx(classes.flexContainer)}>
              {company.logo && (
                <IconButton
                  className={classes.flexContainerItem}
                  aria-label="upload picture"
                  variant="contained"
                  color="primary"
                  component="label"
                >
                  <Avatar
                    variant="square"
                    className={classes.large}
                    alt={company.name}
                    src={selectedFile ?  
                      preview : 
                      `${API}/storage/companies/${company.logo}`}
                  />
                  <input
                    name="logo"
                    accept="image/x-png,image/gif,image/jpeg"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={ (e) => 
                      {
                        setFieldValue("logo", e.currentTarget.files[0]);
                        onSelectedFile(e) 
                      } 
                    }
                  />
                </IconButton>
              )}

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
              type="submit"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
      <CustomSnackbar
        open={isShow}
        status={alertStatus}
        text={alertStatus ? 'Successfully updated!' : 'Oops, retry again...'}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isShow: state.alert.isShow,
    alertStatus: state.alert.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCompany: (idCompany, values) => {
      dispatch(updateCompany(idCompany, values));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
