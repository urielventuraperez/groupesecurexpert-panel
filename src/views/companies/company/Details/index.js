import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'src/components/Page';
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
      <BackButton history={props.history} />
    </Page>
  );
}

export default InsuraceView;