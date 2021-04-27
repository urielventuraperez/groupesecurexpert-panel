import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { API, LSTOKEN } from 'src/utils/environmets';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  input: {
    display: 'none'
  },
  section: {
    margin: theme.spacing(3, 0)
  }
}));

const FolderList = ({ files }) => {
  const classes = useStyles();

  async function uploadFile(id) {
      fetch(`${API}/api/company/insurance/detail/${id}/file`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
          }
      })
  }

  const onSelectedFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
  }
    uploadFile(e);
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Divider variant="middle" />
      <Box className={classes.section}>
        <Typography paragraph variant="h4">
          Files to Download
        </Typography>
        <label htmlFor="contained-button-file">
          <Button variant="outlined" color="secondary" component="label">
            Upload new file
            <input
              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                onSelectedFile(e);
              }}
            />
          </Button>
        </label>
      </Box>
      <List className={classes.section}>
        {files.length === 0 ? (
          <Typography variante="h5">Upload the first File</Typography>
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
