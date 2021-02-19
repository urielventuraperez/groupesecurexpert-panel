import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FaqDialog from './Form';

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader
        subheader="Manage the frequent answer questions"
        title="FAQ"
      />
      <Divider />
      <CardContent>
        <Typography color="textPrimary" gutterBottom variant="h6">
          List
        </Typography>

        {props.faqs.map(faq => (
          <Accordion key={faq.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{faq.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {faq.status}
              </Typography>
            </AccordionDetails>
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
      </CardContent>
      <FaqDialog open={open} close={handleClose} />
    </Card>
  );
};

export default TabsFaq;
