import { makeStyles } from 'tss-react/mui';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles()((theme) => ({
  menuItem: {
    borderRadius: 12,
    marginBottom: 4,
    paddingTop: 10,
    paddingBottom: 10,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(76, 175, 80, 0.10)'
        : 'rgba(76, 175, 80, 0.06)',
    },
  },
  menuItemSelected: {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(76, 175, 80, 0.18)'
      : 'rgba(76, 175, 80, 0.10)',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginRight: 12,
    '& svg': {
      fontSize: 20,
    },
  },
  menuItemText: {
    whiteSpace: 'nowrap',
  },
}));

const MenuItem = ({ title, link, icon, selected }) => {
  const { classes, cx } = useStyles();
  return (
    <ListItemButton
      key={link}
      component={Link}
      to={link}
      selected={selected}
      className={cx(classes.menuItem, selected && classes.menuItemSelected)}
    >
      <ListItemIcon>
        <div className={classes.iconWrapper}>{icon}</div>
      </ListItemIcon>
      <ListItemText primary={title} className={classes.menuItemText} />
    </ListItemButton>
  );
};

export default MenuItem;
