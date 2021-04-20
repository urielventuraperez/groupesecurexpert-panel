import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import StarIcon from '@material-ui/icons/Star';

const ListDetails = ({details}) => {

  return (
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
              <IconButton edge="end" aria-label="details">
                <ArrowRightRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default ListDetails;