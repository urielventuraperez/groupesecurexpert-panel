import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import CompanyDialog from './Form';
import { Search as SearchIcon } from 'react-feather';
import { connect } from 'react-redux';
import { filterCompanies } from 'src/redux/actions/companies';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, filterCompanies, ...rest }) => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    filterCompanies(searchValue);
  }, [searchValue])

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Company
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search company"
                variant="outlined"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <CompanyDialog open={open} close={handleClose}/>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterCompanies: (name) => {
      dispatch(filterCompanies(name));
    }
  }
}

export default connect(null, mapDispatchToProps)(Toolbar);
