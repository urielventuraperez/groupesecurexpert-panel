import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
import { TextEditor } from 'src/components/TextEditor';
import CloseIcon from '@material-ui/icons/Close';
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

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FaqDialog = props => {
  const classes = useStyles();
  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen
      open={props.open}
      onClose={props.close}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add new FAQ
          </Typography>
        </Toolbar>
      </AppBar>
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
                fullWidth
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
                InputProps={{
                  inputComponent: TextEditor
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.close}>Cancel</Button>
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

const mapDispatchToProps = dispatch => {
  return {
    addFaq: faq => {
      dispatch(addFaq(faq));
    }
  };
};

export default connect(null, mapDispatchToProps)(FaqDialog);
