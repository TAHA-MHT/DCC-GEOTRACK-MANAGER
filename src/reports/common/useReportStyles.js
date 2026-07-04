import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  containerMap: {
    flexBasis: 'var(--report-map-height, 40%)',
    flexShrink: 0,
  },
  containerMain: {
    overflow: 'auto',
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    '& table': {
      backgroundColor: '#ffffff',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#0d47a1',
    },
    '& .MuiTableCell-head': {
      color: '#ffffff',
      fontWeight: 600,
    },
    '& .MuiTableCell-body': {
      color: '#212121',
    },
  },
  header: {
    position: 'sticky',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  columnAction: {
    width: '1%',
    paddingLeft: theme.spacing(1),
    '@media print': {
      display: 'none',
    },
  },
  columnActionContainer: {
    display: 'flex',
  },
  filter: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    padding: theme.spacing(3, 2, 2),
    backgroundColor: '#ffffff',
    margin: theme.spacing(1.5),
    borderRadius: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      backgroundColor: '#ffffff',
      color: '#212121',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#c4c4c4',
    },
    '& .MuiInputLabel-root': {
      color: '#666666',
    },
    '& .MuiSvgIcon-root': {
      color: '#666666',
    },
    '@media print': {
      display: 'none !important',
    },
  },
  filterItem: {
    minWidth: 0,
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
  },
  filterButtons: {
    display: 'flex',
    gap: theme.spacing(1),
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
  },
  filterButton: {
    flexGrow: 1,
    borderRadius: 8,
  },
  chart: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  actionCellPadding: {
    '&.MuiTableCell-body': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '@media print': {
      display: 'none',
    },
  },
}));
