import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
// import { TextEditor } from 'src/components/TextEditor';
import ModalToolbar from 'src/components/ModalToolbar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addFaq, updateFaq } from 'src/redux/actions/faqs';
import { connect } from 'react-redux';

const FaqSchema = Yup.object().shape({
  ask: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Required'),
  answer: Yup.string()
    .min(2, 'Too Short!')
    .max(5550, 'Too Long!')
    .required('Required')
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FaqDialog = props => {
  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      open={props.open}
      onClose={props.close || props.closeModal}
    >
      <ModalToolbar title={ !props.faq ? 'Add new FAQ' : `Update ${props.faq.ask}` } action={'Close'} close={props.close} />
      <Formik
        initialValues={{
          ask: props.faq ? props.faq.ask : '',
          answer: props.faq ? props.faq.answer : ''
        }}
        validationSchema={FaqSchema}
        onSubmit={values => {
          !props.faq ?
          props.addFaq(values) && props.close
          :
          props.updateFaq(values, props.faq.id) && props.close
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
          values
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                error={Boolean(touched.ask && errors.ask)}
                helperText={touched.ask && errors.ask}
                margin="dense"
                id="ask"
                name="ask"
                label="Add the Question"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ask}
                type="text"
                fullWidth
              />
              <TextField
                fullWidth
                multiline
                rowsMax={10}
                error={Boolean(touched.answer && errors.answer)}
                helperText={touched.answer && errors.answer}
                margin="dense"
                id="answer"
                name="answer"
                label="Add the answer"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.answer}
                type="text"

              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.close}>Cancel</Button>
              <Button
                onClick={props.close}
                disabled={ !props.faq && !(isValid && dirty)}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                { !props.faq ? 'Save' : 'Update' }
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    faqs: state.faqs.faqs,
    closeModal: state.faqs.closeModal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFaq: (faq) => {
      dispatch(addFaq(faq));
    },
    updateFaq: (faq, id) => {
      dispatch(updateFaq(faq, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FaqDialog);
