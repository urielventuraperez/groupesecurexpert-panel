import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FaqDialog from './Form';
import { getFaqs, deleteFaq } from 'src/redux/actions/faqs';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
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

const TabsFaq = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getFaqs, faqs } = props;

  useEffect(()=>{
    getFaqs()
  }, [getFaqs]);


  return (
    <div>
      <Card>
        <CardHeader
          subheader="Manage the frequent answer questions"
          title="FAQ"
        />
        <Divider />
      </Card>
      {faqs.map(faq => (
        <Accordion key={faq.id} expanded={expanded === `panel${faq.id}`} onChange={handleChange(`panel${faq.id}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{faq.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.status}</Typography>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button onClick={() => props.deleteFaq(faq.id)} size="small">Delete</Button>
            <Button size="small" color="primary">
              Update
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
      <Fab
        onClick={handleClickOpen}
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <FaqDialog open={open} close={handleClose} />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TabsFaq);
