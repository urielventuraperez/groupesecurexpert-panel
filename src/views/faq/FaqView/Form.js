import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addFaq } from 'src/redux/actions/faqs';
import { connect } from 'react-redux';

const FaqSchema = Yup.object().shape({
  question: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Required'),
  answer: Yup.string()
    .min(2, 'Too Short!')
    .max(550, 'Too Long!')
    .required('Required')
});

const FaqDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle id="form-dialog-title">Add new FAQ</DialogTitle>
      <Formik
        initialValues={{
          question: '',
          answer: ''
        }}
        validationSchema={FaqSchema}
        onSubmit={values => {
          props.addFaq(values);
        }}
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
        <Form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              error={Boolean(touched.question && errors.question)}
              helperText={touched.question && errors.question}
              margin="dense"
              id="question"
              name="question"
              label="Add the Question"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.question}
              type="text"
              fullWidth
            />
            <TextField
              multiline
              error={Boolean(touched.answer && errors.answer)}
              helperText={touched.answer && errors.answer}
              rows={10}
              margin="dense"
              id="answer"
              name="answer"
              label="Add the answer"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.answer}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close}>
              Cancel
            </Button>
            <Button
              disabled={!(isValid && dirty) || isSubmitting}
              type="submit"
              variant="contained"
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

const mapDispatchToProps = (dispatch) => {
    return {
      addFaq: (faq) => {
        dispatch(addFaq(faq))
      }
    }
}

export default connect(null, mapDispatchToProps)(FaqDialog);
