import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import StraightenIcon from '@mui/icons-material/Straighten';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/Error';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { devicesActions } from '../store';
import { formatAlarm, formatBoolean, formatStatus } from '../common/util/formatter';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useAdministrator } from '../common/util/permissions';
import EngineIcon from '../resources/images/data/engine.svg?react';
import { useAttributePreference } from '../common/util/preferences';
import GeofencesValue from '../common/components/GeofencesValue';
import DriverValue from '../common/components/DriverValue';
import MotionBar from './components/MotionBar';

dayjs.extend(relativeTime);

const STATUS_COLORS = {
  stopped: '#e53935',
  online: '#43a047',
  moving: '#43a047',
  idle: '#fb8c00',
  offline: '#9e9e9e',
  unknown: '#9e9e9e',
};

const useStyles = makeStyles()((theme) => ({
  card: {
    margin: theme.spacing(1, 1.5),
    borderRadius: 12,
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  selected: {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
  disabled: {
    opacity: 0.5,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1.5, 2),
  },
  plate: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  statusText: {
    fontWeight: 600,
    fontSize: '0.8rem',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1.5, 1.5),
    gap: theme.spacing(0.5),
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: '1.1rem',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  statValue: {
    fontSize: '0.7rem',
    fontWeight: 600,
    textAlign: 'center',
  },
  success: {
    color: theme.palette.success.main,
  },
  neutral: {
    color: theme.palette.neutral.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid rgba(0,0,0,0.08)',
    padding: theme.spacing(0.5, 0),
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '0.65rem',
    color: theme.palette.text.secondary,
  },
}));

const DeviceRow = ({ devices, index, style }) => {
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useTranslation();

  const admin = useAdministrator();
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);

  const item = devices[index];
  const position = useSelector((state) => state.session.positions[item.id]);

  const devicePrimary = useAttributePreference('devicePrimary', 'name');
  const deviceSecondary = useAttributePreference('deviceSecondary', '');

  const resolveFieldValue = (field) => {
    if (field === 'geofenceIds') {
      const geofenceIds = position?.attributes?.geofenceIds;
      return geofenceIds?.length ? <GeofencesValue geofenceIds={geofenceIds} /> : null;
    }
    if (field === 'driverUniqueId') {
      const driverUniqueId = position?.attributes?.driverUniqueId;
      return driverUniqueId ? <DriverValue driverUniqueId={driverUniqueId} /> : null;
    }
    if (field === 'motion') {
      return <MotionBar deviceId={item.id} />;
    }
    return item[field];
  };

  const primaryValue = resolveFieldValue(devicePrimary);
  void deviceSecondary;

  const status =
    item.status === 'online' || !item.lastUpdate
      ? formatStatus(item.status, t)
      : dayjs(item.lastUpdate).fromNow();

  const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.unknown;

  const odometerKm = position?.attributes?.totalDistance
    ? Math.round(position.attributes.totalDistance / 1000)
    : null;
  const speedKmh = position?.speed ? Math.round(position.speed * 1.852) : 0;
  const engineHours = position?.attributes?.hours
    ? Math.round(position.attributes.hours / 3600000)
    : 0;

  const disabled = !admin && item.disabled;
  const selected = selectedDeviceId === item.id;

  const handleSelect = () => {
    if (!disabled) {
      dispatch(devicesActions.selectId(item.id));
    }
  };

  const handleLiveTracking = (event) => {
    event.stopPropagation();
    dispatch(devicesActions.selectId(item.id));
    navigate('/map');
  };

  const handlePlayback = (event) => {
    event.stopPropagation();
    navigate(`/replay?deviceId=${item.id}`);
  };

  const handleDashboard = (event) => {
    event.stopPropagation();
    dispatch(devicesActions.selectId(item.id));
    navigate('/');
  };

  return (
    <div style={style}>
      <Box
        className={cx(classes.card, selected && classes.selected, disabled && classes.disabled)}
        onClick={handleSelect}
      >
        <div className={classes.header}>
          <Typography className={classes.plate}>{primaryValue}</Typography>
          <Typography className={classes.statusText} style={{ color: statusColor }}>
            {status}
          </Typography>
        </div>

        <div className={classes.statsRow}>
          <div className={classes.statItem}>
            <EngineIcon
              width={20}
              height={20}
              className={position?.attributes?.ignition ? classes.success : classes.neutral}
            />
            <Typography className={classes.statLabel}>{t('positionIgnition')}</Typography>
            <Typography className={classes.statValue}>
              {formatBoolean(position?.attributes?.ignition, t)}
            </Typography>
          </div>
          <div className={classes.statItem}>
            <GpsFixedIcon
              className={cx(classes.statIcon, position ? classes.success : classes.neutral)}
            />
            <Typography className={classes.statLabel}>GPS</Typography>
            <Typography className={classes.statValue}>{position ? 'On' : 'Off'}</Typography>
          </div>
          <div className={classes.statItem}>
            <StraightenIcon className={cx(classes.statIcon, classes.neutral)} />
            <Typography className={classes.statLabel}>Odometer</Typography>
            <Typography className={classes.statValue}>
              {odometerKm !== null ? `${odometerKm}km` : '-'}
            </Typography>
          </div>
          <div className={classes.statItem}>
            <SpeedIcon className={cx(classes.statIcon, classes.neutral)} />
            <Typography className={classes.statLabel}>Speed</Typography>
            <Typography className={classes.statValue}>{`${speedKmh}km`}</Typography>
          </div>
          <div className={classes.statItem}>
            <AccessTimeIcon className={cx(classes.statIcon, classes.neutral)} />
            <Typography className={classes.statLabel}>Engine hour</Typography>
            <Typography className={classes.statValue}>{`${engineHours}h`}</Typography>
          </div>
        </div>

        {position?.attributes?.hasOwnProperty('alarm') && (
          <Box display="flex" justifyContent="center" pb={1}>
            <Tooltip title={`${t('eventAlarm')}: ${formatAlarm(position.attributes.alarm, t)}`}>
              <IconButton size="small">
                <ErrorIcon fontSize="small" className={classes.error} />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <div className={classes.actionsRow}>
          <div className={classes.actionButton}>
            <IconButton size="small" color="inherit" onClick={handleLiveTracking}>
              <MyLocationIcon fontSize="small" />
            </IconButton>
            Live Tracking
          </div>
          <div className={classes.actionButton}>
            <IconButton size="small" color="inherit" onClick={handlePlayback}>
              <PlayArrowIcon fontSize="small" />
            </IconButton>
            Playback
          </div>
          <div className={classes.actionButton}>
            <IconButton size="small" color="inherit" onClick={handleDashboard}>
              <DashboardIcon fontSize="small" />
            </IconButton>
            Dashboard
          </div>
        </div>
      </Box>
    </div>
  );
};

export default DeviceRow;
