import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { deepPurple } from '@material-ui/core/colors';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
})
);

const Profile = ({ name, lastname, email, lastLogged, className, ...rest }) => {
  const classes = useStyles();

  const lastConexion = (dateObj) => {
    const momentObj = moment(dateObj);
    const momentString = momentObj.format('LLL'); 
    return momentString;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
          >
            {`${((name || "").charAt(0) || "")}${((lastname || "").charAt(0) || "")}`}
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {`${name} ${lastname}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${email}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`Last session: ${lastConexion(lastLogged)}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
