import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import ModalToolbar from 'src/components/ModalToolbar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addCompany } from 'src/redux/actions/companies';

const FaqSchema = Yup.object().shape({
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
    .min(5, "Too Short!")
    .max(300, "Too Long!")
});

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2)
  },
  img: {
    width: '100px',
    margin: theme.spacing(2)
  },
})
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CompanyDialog = props => {

  const classes = useStyles();
  const [preview, setPreview] = React.useState()
  const [selectedFile, setSelectedFile] = React.useState()

  // create a preview as a side effect, whenever selected file is changed
  React.useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      setSelectedFile(e.target.files[0])
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.close}
      TransitionComponent={Transition}
    >
      <ModalToolbar
        title={'Add new Company'}
        action={'Close'}
        close={props.close}
      />
      <DialogTitle id="form-dialog-title">¡Manage your companies!</DialogTitle>
      <Formik
        initialValues={{
          name: '',
          description: '',
          quote: '',
          order_url: ''
        }}
        validationSchema={FaqSchema}
        onSubmit={values => {
          props.addCompany(values);
          setSelectedFile(undefined)
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
          setFieldValue,
          values
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Company name"
                type="text"
                fullWidth
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Company Description"
                type="text"
                fullWidth
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />
              <TextField
                autoFocus
                margin="dense"
                id="quote"
                name="quote"
                label="Company quote"
                type="text"
                fullWidth
                error={Boolean(touched.quote && errors.quote)}
                helperText={touched.quote && errors.quote}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quote}
              />
              <TextField
                autoFocus
                margin="dense"
                id="order_url"
                name="order_url"
                label="Company website"
                type="text"
                fullWidth
                error={Boolean(touched.order_url && errors.order_url)}
                helperText={touched.order_url && errors.order_url}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.order_url}
              />
              <Button className={classes.button} color="primary" component="label">
                Upload Logo
                <input
                  type="file"
                  name="logo"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  onChange = { (e) => { setFieldValue("logo", e.currentTarget.files[0]); onSelectFile(e) } }
                />
                {selectedFile &&  <img className={classes.img} src={preview} /> }
              </Button>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={props.close}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={ !(isValid && dirty) }
                type="submit"
                onClick={props.close}
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addCompany: (company) => {
      dispatch(addCompany(company));
    }
  };
};


export default connect(null, mapDispatchToProps)(CompanyDialog);
