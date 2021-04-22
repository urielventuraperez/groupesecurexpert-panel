import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import StarIcon from '@material-ui/icons/Star';
import FullScreenDialogFormDetail from './Details/';

const ListDetails = ({details, insurance, company}) => {

  const [open, setOpen] = useState(false);
  const [detailName, setDetailName] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [detailId, setDetailId] = useState('');

  const handleClickOpen = (detail, detailName,insuranceName, companyName) => {
    setOpen(true);
    setDetailName(detailName);
    setInsuranceName(insuranceName);
    setCompanyName(companyName);
    setDetailId(detail);
  };

  const handleClose = () => {
    setOpen(false);
    setDetailName('');
    setInsuranceName('');
    setCompanyName('');
    setDetailId('');
  }

  return (
    <div>
    <List>
      {details.map((detail) => {
        return (
          <ListItem 
            key={detail.id}
            role={undefined}
            dense 
            button>
            <ListItemIcon>
              <StarIcon color={detail.active ? 'secondary' : 'disabled'} />
            </ListItemIcon>  
            <ListItemText id={detail.id} primary={detail.name} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleClickOpen(detail.id, detail.name, insurance, company)} edge="end" aria-label="details">
                <ArrowRightRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    <FullScreenDialogFormDetail 
        open={open} 
        close={handleClose}
        detail={detailName}
        insurance={insuranceName}
        company={companyName}
        detailId={detailId}
        />
    </div>
  );
}

export default ListDetails;