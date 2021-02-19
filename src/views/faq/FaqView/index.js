import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Page from 'src/components/Page';
import TabsFaq from './Tabs';
import { getFaqs } from 'src/redux/actions/faqs';
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

  const { getFaqs, faqs } = props;

  useEffect(()=>{
    getFaqs()
  }, [getFaqs]);

  return (
    <Page className={classes.root} title={'Faq'}>
      <Container maxWidth="lg">
          <TabsFaq faqs={faqs} />
      </Container>
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
    getFaqs: () => { dispatch(getFaqs()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
