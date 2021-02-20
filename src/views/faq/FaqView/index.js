import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Page from 'src/components/Page';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import TabsFaq from './Tabs';
import FaqDialog from './Form';
import { getFaqs, deleteFaq } from 'src/redux/actions/faqs';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Faq = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getFaqs, deleteFaq, faqs } = props;

  useEffect(()=>{
    getFaqs()
  }, [getFaqs]);

  return (
    <Page className={classes.root} title={'Faq'}>
      <Container maxWidth="lg">
      <Card>
        <CardHeader
          subheader="Manage the frequent answer questions"
          title="FAQ"
        />
        <Divider />
      </Card>
      {faqs.map(faq => (
          <TabsFaq key={faq.id} faq={faq} deleteFaq={()=>deleteFaq(faq.id)} />
      ))}
      </Container>
      <Fab
        onClick={handleClickOpen}
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <FaqDialog open={open} close={handleClose} />
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoadFaq: state.faqs.isLoadFaq,
    faqs: state.faqs.faqs
  }
}

const mapDispatchToProps = (dispatch) => {
return {
  getFaqs: () => { dispatch(getFaqs()) },
  deleteFaq: (faq) => { dispatch(deleteFaq(faq)) }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
