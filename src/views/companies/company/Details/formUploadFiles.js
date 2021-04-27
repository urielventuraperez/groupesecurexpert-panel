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

  return (
    <Container maxWidth={false} className={classes.root}>
      <Divider variant="middle" />
      <Box className={classes.section}>
        <Typography paragraph variant="h4">Files to Download</Typography>
        <input
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload new file
          </Button>
        </label>
      </Box>
      <List className={classes.section}>
        {
        files.length === 0 ? 
        <Typography variante="h5">
            Upload the first File
        </Typography>
        :
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
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FolderList;
