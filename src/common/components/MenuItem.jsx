import { makeStyles } from 'tss-react/mui';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()(() => ({
  menuItem: {
    borderRadius: 12,
    marginBottom: 4,
    paddingTop: 10,
    paddingBottom: 10,
    '&:hover': {
      backgroundColor: 'rgba(33, 150, 243, 0.06)',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(33, 150, 243, 0.12) !important',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'rgba(33, 150, 243, 0.18) !important',
    },
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: '50%',
    backgroundColor: '#2196F3',
    color: '#fff',
    marginRight: 12,
    '& svg': {
      fontSize: 20,
    },
  },
  menuItemText: {
    whiteSpace: 'nowrap',
    color: '#212121',
  },
}));

const MenuItem = ({ title, link, icon, selected }) => {
  const { classes } = useStyles();
  return (
    <ListItemButton
      key={link}
      component={Link}
      to={link}
      selected={selected}
      className={classes.menuItem}
    >
      <ListItemIcon>
        <div className={classes.iconWrapper}>{icon}</div>
      </ListItemIcon>
      <ListItemText primary={title} className={classes.menuItemText} />
    </ListItemButton>
  );
};

export default MenuItem;
