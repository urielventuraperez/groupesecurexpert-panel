import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const DetailSchema = Yup.object().shape({
  content: Yup.string()
    .min(2, 'Too Short!')
    .max(10000, 'Too Long!')
    .required('Required'),
  note: Yup.string()
    .min(5, 'Too Short!')
    .max(550, 'Too Long!'),
});

const useStyles = makeStyles(theme => ({
  container: {
      margin: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  large: {
    width: theme.spacing(20),
    height: 'auto'
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const FormDetail = () => {
  const classes = useStyles();
  return (
    <div key={1} className={classes.container}>
      <Formik
        initialValues={{
          content: '',
          note: ''
        }}
        validationSchema={DetailSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Content"
                name="content"
                variant="outlined"
                multiline
                rows={10}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.content}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Note"
                name="note"
                multiline
                variant="outlined"
                rows={10}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.note}
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

export default FormDetail;
