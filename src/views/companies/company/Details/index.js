import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RadioInsurances from './FormInsurances';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
}));

const InsuraceView = (props) => {
  const { match } = props;
  const companyId = match.params.idCompany;

  const classes = useStyles();
  return (
    <Page className={classes.root} title={`Insurance`}>
      <RadioInsurances idCompany={companyId} />
      <Fab onClick={props.history.goBack} color="secondary" aria-label="add" className={classes.fab}>
        <ArrowBackIcon />
      </Fab>
    </Page>
  );
}

export default InsuraceView;