import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ModalAction from 'src/components/ModalActions';
import FaqDialog from './Form';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const TabsFaq = props => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [ faqContent, setFaqContent ] = React.useState({
    id: '',
    ask: '',
    answer: ''
  })

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const handleClickOpenModalUpdate = (id, ask, answer) => {
    setOpenModalUpdate(true);
    setFaqContent({ id:id, ask:ask, answer:answer });
  };
  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };


  const [openModal, setOpenModal] = useState(false);
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { faq, deleteFaq } = props;

  return (
    <div>
      <Accordion
        expanded={expanded === `panel${faq.id}`}
        onChange={handleChange(`panel${faq.id}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{faq.ask}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.answer}</Typography>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button color="secondary" variant="contained" onClick={handleClickOpenModal} size="small" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button onClick={() => { handleClickOpenModalUpdate(faq.id, faq.ask, faq.answer) }} size="small" variant="contained" color="primary"  startIcon={<EditIcon />}>
            Update
          </Button>
        </AccordionActions>
      </Accordion>
      <ModalAction
        mainAction={() => deleteFaq(faq.id)}
        openModal={openModal}
        onCloseModal={handleCloseModal}
      />
      <FaqDialog faq={faqContent} open={openModalUpdate} close={handleCloseModalUpdate} />
    </div>
  );
};

export default TabsFaq;
