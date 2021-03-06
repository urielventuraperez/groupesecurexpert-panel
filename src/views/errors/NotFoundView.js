import React from 'react';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Button from '@material-ui/core/Button';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 320
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/static/images/404_not_found.png"
            />
          </Box>
          <Box textAlign="center">
            <Button
              color="primary"
              aria-label="add"
              component={RouterLink}
              to={`/`}
            >
              Go back home
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
