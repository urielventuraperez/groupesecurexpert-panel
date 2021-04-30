import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LinearProgress from '@material-ui/core/LinearProgress';
import CustomSnackbar from 'src/components/Alert';
import { API, LSTOKEN } from 'src/utils/environmets';
import FormUploadFiles from './formUploadFiles';
import FormDeductibles from './formDeductibles';

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

const FormDetail = ({ detailId }) => {
  const classes = useStyles();

  const [isLoad, setIsLoad] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  // Show Alert
  const [ alert, setAlert ] = useState({
    status: 'error',
    open: false,
    text: ''
  })

  async function updateDetail(detailId, values) {
    let formData = new FormData();
    Object.keys(values).forEach(key => formData.append(key, values[key]) )
    setIsDisabled(false);
    fetch(`${API}/api/company/insurance/detail/${detailId}`, 
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    }).then(response => response.json())
    .then(
      json => {
        setAlert({
          status: json.status,
          open: true,
          text: json.message
        })
        setIsDisabled(false);
      }
    )
  }

  useEffect(() => {
    if( detailId ) {
      setIsLoad(false);
      fetch(`${API}/api/company/insurance/detail/${detailId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
        }
      }).then(response => response.json())
          .then( json => {
              if (json.status) {
                setDetailData(json.data);
                setIsLoad(true);
              }
          }).catch(
            (e) => {
              console.log(e);
            }
          );
    }
  }, [detailId])

  return (
    isLoad ? 
    <Container maxWidth={false} key={1}>
      <Formik
        initialValues={{
          content: detailData.content ? detailData.content : '',
          note: detailData.note ? detailData.note : ''
        }}
        validationSchema={DetailSchema}
        onSubmit={values => {
          updateDetail(detailId, values);
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Add the new Content..."
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
                label="Add the new Note..."
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
              type="submit"
              disabled = { isDisabled ? true : false }
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
      {
        detailData.title_detail_id === 7 &&
        <FormUploadFiles files = {detailData.files} idDetail={detailId} />
      }
      {
        detailData.title_detail_id === 5 &&
        <FormDeductibles deductibles={detailData.deductibles} idDetail={detailId} />
      }
      <CustomSnackbar open={alert.open} status={alert.status} text = {alert.text} />
    </Container>
    :
    <LinearProgress color="secondary" />
  );
};

export default FormDetail;
