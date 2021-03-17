import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteCompany from './DeleteCompany';
import { API, LSTOKEN } from 'src/utils/environmets';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}));

const CompanyCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  const [isActive, setActive] = useState(true);

  React.useEffect(() => {
    setActive(product.active)
  }, [product.active])

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addedMoment = dateObj => {
    const momentObj = moment(dateObj);
    const momentString = momentObj.format('LLL');
    return momentString;
  };

  const activeCompany = async (id) => {
    let response = await fetch(`${API}/api/company/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LSTOKEN)}`
      }
    });
    if (response.status) {
      let active = await response.json();
      setActive(active.data);
    }
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Box>
            <IconButton
              color="secondary"
              onClick={() => {activeCompany(product.id)}}
              aria-label="settings"
            >
              {isActive ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
            <IconButton
              onClick={handleClickOpen}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            alt="Product"
            src={`${API}/storage/companies/${product.logo}`}
            variant="square"
            className={classes.large}
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.status}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {`Added at ${addedMoment(product.created_at)}`}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button
              component={Link}
              to={`/app/company/${product.id}`}
              color="primary"
            >
              View more
            </Button>
          </Grid>
        </Grid>
      </Box>
      <DeleteCompany open={open} name={product.name} id={product.id} onClose={handleClose} />
    </Card>
  );
};

CompanyCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default CompanyCard;
