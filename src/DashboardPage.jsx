import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useTranslation } from './common/components/LocalizationProvider';

const useStyles = makeStyles()((theme) => ({
  page: {
    padding: theme.spacing(2),
    overflow: 'auto',
    height: '100%',
    backgroundColor: '#fff',
  },
  donutWrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3, 0),
  },
  donut: {
    width: 220,
    height: 220,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutInner: {
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutLogo: {
    width: '50%',
    height: 'auto',
    marginBottom: theme.spacing(0.5),
  },
  donutBrand: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '0.7rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: '50%',
    width: 26,
    height: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardIcon: {
    fontSize: 32,
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardLabel: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
}));

const CATEGORY_COLORS = {
  stopped: '#e74c3c',
  moving: '#1565C0',
  idle: '#f39c12',
  offline: '#95a5a6',
  notConnected: '#3498db',
  expired: '#8d5524',
};

const categorize = (device, position) => {
  if (device.expirationTime && new Date(device.expirationTime) < new Date()) {
    return 'expired';
  }
  if (device.status === 'offline') {
    return 'offline';
  }
  if (device.status === 'unknown') {
    return 'notConnected';
  }
  if (position?.attributes?.motion) {
    return 'moving';
  }
  if (position?.attributes?.ignition) {
    return 'idle';
  }
  return 'stopped';
};

const DashboardPage = () => {
  const { classes } = useStyles();
  const t = useTranslation();

  const devices = useSelector((state) => state.devices.items);
  const positions = useSelector((state) => state.session.positions);

  const counts = useMemo(() => {
    const result = {
      stopped: 0, moving: 0, idle: 0, offline: 0, notConnected: 0, expired: 0,
    };
    Object.values(devices).forEach((device) => {
      const category = categorize(device, positions[device.id]);
      result[category] += 1;
    });
    return result;
  }, [devices, positions]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const gradient = useMemo(() => {
    const order = ['stopped', 'moving', 'idle', 'offline', 'notConnected', 'expired'];
    let acc = 0;
    const stops = order.map((key) => {
      const value = counts[key];
      const start = total ? (acc / total) * 360 : 0;
      acc += value;
      const end = total ? (acc / total) * 360 : 0;
      return `${CATEGORY_COLORS[key]} ${start}deg ${end}deg`;
    });
    return total ? `conic-gradient(${stops.join(', ')})` : '#e0e0e0';
  }, [counts, total]);

  const cards = [
    { key: 'stopped', label: t('deviceStatusStopped') || 'Stopped' },
    { key: 'moving', label: t('deviceStatusMoving') || 'Moving' },
    { key: 'idle', label: t('deviceStatusIdle') || 'Idle' },
    { key: 'offline', label: t('deviceStatusOffline') || 'Offline' },
    { key: 'notConnected', label: t('deviceStatusNotConnected') || 'Not Connected' },
    { key: 'expired', label: t('deviceStatusExpired') || 'Expired' },
  ];

  return (
    <div className={classes.page}>
      <Paper elevation={3} className={classes.donutWrapper} style={{ backgroundColor: '#fff' }}>
        <div className={classes.donut} style={{ background: gradient }}>
          <div className={classes.donutInner}>
            
            <DirectionsCarIcon style={{ fontSize: 40, color: '#43a047', marginBottom: 4 }} />
          </div>
        </div>
      </Paper>
      <Typography variant="h5" align="center" sx={{ marginBottom: 2, color: '#333' }}>
        Total: {total}
      </Typography>
      <div className={classes.grid}>
        {cards.map(({ key, label }) => (
          <div key={key} className={classes.cardItem}>
            <div className={classes.card} style={{ backgroundColor: CATEGORY_COLORS[key] }}>
              <div className={classes.badge} style={{ color: CATEGORY_COLORS[key] }}>
                {counts[key]}
              </div>
              <DirectionsCarIcon className={classes.cardIcon} />
            </div>
            <Typography variant="body2" className={classes.cardLabel}>{label}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
