import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { API, LSTOKEN } from 'src/utils/environmets';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FileSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(10000, 'Too Long!'),
  file: Yup.mixed().required('A file is required')
});

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  input: {
    display: 'none'
  },
  inputForm: {
    marginRight: theme.spacing(2)
  },
  section: {
    margin: theme.spacing(3, 0)
  }
}));

const FolderList = ({ files, idDetail }) => {
  const classes = useStyles();

  async function uploadFile(id, data) {
    let formData = new FormData();
    Object.keys(data).forEach( key => formData.append(key, data[key]));

    fetch(`${API}/api/company/insurance/detail/${id}/file`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    });
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Divider variant="middle" />
      <Box className={classes.section}>
        <Typography paragraph variant="h4">
          Files to Download
        </Typography>
        <Formik
          initialValues={{
            title: '',
            description: ''
          }}
          validationSchema={FileSchema}
          onSubmit={values => {
            console.log(values);
            uploadFile(idDetail, values);
          }}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
            errors,
            touched,
            values
          }) => (
            <Form onSubmit={handleSubmit}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes.inputForm}
                value={values.title}
                id="title"
                label="File title"
              />
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                id="description"
                className={classes.inputForm}
                label="File description"
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  variant="outlined"
                  color="secondary"
                  component="label"
                >
                  <AttachFileIcon />
                  <input
                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file"
                    onChange={e => {
                      setFieldValue('file', e.target.files[0]);
                    }}
                  />
                </IconButton>
              </label>
              <Button type="submit" variant="outlined" color="secondary">
                Upload file
              </Button>
              {errors.file && touched.file ? (
                    <div>{errors.file}</div>
                  ) : null}
                  <ErrorMessage name="file" />
            </Form>
          )}
        </Formik>
    
      </Box>
      <List className={classes.section}>
        {files.length === 0 ? (
          <Alert severity="warning">Without files...</Alert>
        ) : (
          files.map(file => (
            <ListItem key={file.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={file.title || 'File'}
                secondary={file.description || 'Description'}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="update">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default FolderList;
