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

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
          <Typography className={classes.heading}>{faq.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{faq.status}</Typography>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button onClick={handleClickOpenModal} size="small">
            Delete
          </Button>
          <Button size="small" color="primary">
            Update
          </Button>
        </AccordionActions>
      </Accordion>
      <ModalAction
        mainAction={() => deleteFaq(faq.id)}
        openModal={openModal}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default TabsFaq;
