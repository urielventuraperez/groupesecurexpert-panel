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
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
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
  },
  chip: {
    marginLeft: theme.spacing(1)
  }
}));

const CompanyCard = ({ className, company }) => {
  const classes = useStyles();

  const [isActive, setActive] = useState(true);

  React.useEffect(() => {
    setActive(company.active)
  }, [])

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
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Box>
            <IconButton
              color="secondary"
              onClick={() => {activeCompany(company.id)}}
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
            alt="Company Image"
            src={`${API}/storage/companies/${company.logo}`}
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
          {company.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {company.status}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid direction="column" container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {`Added at ${addedMoment(company.created_at)}`}
            </Typography>
          </Grid>

          { Array.isArray(company.insurances) && company.insurances.length ? (
            <Grid className={classes.statsItem} item>
              {
                company.insurances.map( insurance => (
                  <Chip key={insurance.id} className={classes.chip} icon={<DoneIcon />} variant="outlined" color="primary" label={insurance.insurance_name} component="a" href="#chip" clickable />
                  ))
              }  
            </Grid>
          ) : (
            <Grid className={classes.statsItem} item>
              <Chip variant="outlined" icon={<SentimentVeryDissatisfiedIcon />} color="secondary" label="No insurances" component="a" href="#chip" clickable />
            </Grid>
          ) }

          <Grid className={classes.statsItem} item>
            <Button
              component={Link}
              to={`/app/company/${company.id}`}
              color="primary"
            >
              View more
            </Button>
          </Grid>
        </Grid>
      </Box>
      <DeleteCompany open={open} name={company.name} id={company.id} onClose={handleClose} />
    </Card>
  );
};

CompanyCard.propTypes = {
  className: PropTypes.string,
  company: PropTypes.object.isRequired
};

export default CompanyCard;
