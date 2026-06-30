import React, { useState } from 'react';
import { 
  Box, 
  Typography,
  Grid, 
  Card, 
  IconButton, 
  BottomNavigation, 
  BottomNavigationAction 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux'; // Garde la connexion avec vos véhicules

export default function MainPage() {
  const [navigationValue, setNavigationValue] = useState(0);
  
  // Extraction des vrais appareils connectés à votre Traccar
  const devices = useSelector((state) => state.devices.items);
  const positions = useSelector((state) => state.session.positions);

  // Calcul automatique des vrais statuts en temps réel
  const totalDevices = Object.keys(devices).length;
  const countByStatus = (status) => Object.values(devices).filter(d => d.status === status).length;

  const statuts = [
    { label: 'Stopped', count: countByStatus('stopped'), color: '#EF4444' },
    { label: 'Moving', count: countByStatus('online'), color: '#FF6B00' }, // Orange appliqué ici
    { label: 'Idle', count: countByStatus('unknown'), color: '#F59E0B' },
    { label: 'Offline', count: countByStatus('offline'), color: '#9CA3AF' },
    { label: 'Not Connected', count: 0, color: '#3B82F6' },
    { label: 'Expired', count: 0, color: '#78350F' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F9FAFB', pb: 9 }}>
      
      {/* 1. HEADER (ORANGE) */}
      <Box sx={{ bgcolor: '#FF6B00', color: 'white', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton color="inherit"><MenuIcon /></IconButton>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1, lineHeight: 1 }}>DCCGEOTRACK</Typography>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '9px' }}>VEHICLE TRACKING</Typography>
        </Box>
        <Box>
          <IconButton color="inherit"><SearchIcon /></IconButton>
          <IconButton color="inherit"><ShareIcon /></IconButton>
        </Box>
      </Box>

      {/* CONTENU DU DASHBOARD */}
      <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 2 }}>
        
        {/* 2. GRAPHIC EN ANNEAU */}
        <Card sx={{ width: '100%', maxWidth: 360, borderRadius: 6, boxShadow: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box 
            sx={{ 
              position: 'relative', width: 200, height: 200, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'conic-gradient(#FF6B00 0% 50%, #9CA3AF 50% 100%)'
            }}
          >
            <Box sx={{ width: 150, height: 150, bgcolor: 'white', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 2 }}>
              <Typography sx={{ color: '#FF6B00', fontWeight: 'bold', fontSize: '14px' }}>DCCGEOTRACK</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '9px' }}>VEHICLE TRACKING</Typography>
            </Box>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, color: '#4B5563' }}>Total: {totalDevices}</Typography>
        </Card>

        {/* 3. LES 6 STATUTS */}
        <Card sx={{ width: '100%', maxWidth: 360, borderRadius: 6, boxShadow: 3, p: 3 }}>
          <Grid container spacing={2}>
            {statuts.map((statut, index) => (
              <Grid item xs={4} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ bgcolor: statut.color, p: 2, borderRadius: 4, color: 'white', boxShadow: 2, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DirectionsCarIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Box sx={{ position: 'absolute', top: -6, right: -6, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, fontWeight: 'bold', minWidth: 18, height: 18, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.5 }}>
                    {statut.count}
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '11px', mt: 1, fontWeight: '600', color: '#6B7280', textAlign: 'center', lineHeight: 1.2 }}>
                  {statut.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

      </Box>

      {/* 4. BOTTOM NAVIGATION (ORANGE AVEC EFFET VAGUE) */}
      <BottomNavigation 
        value={navigationValue}
        onChange={(event, newValue) => setNavigationValue(newValue)}
        showLabels 
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#FF6B00', height: 64, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      >
        <BottomNavigationAction icon={<DirectionsCarIcon sx={{ color: '#FF6B00', bgcolor: 'white', p: 1, borderRadius: '50%', fontSize: 40, mt: -3, boxShadow: 3 }} />} />
        <BottomNavigationAction icon={<ListIcon sx={{ color: 'white' }} />} />
        <BottomNavigationAction icon={<MapIcon sx={{ color: 'white' }} />} />
        <BottomNavigationAction icon={<NotificationsIcon sx={{ color: 'white' }} />} />
        <BottomNavigationAction icon={<SettingsIcon sx={{ color: 'white' }} />} />
      </BottomNavigation>

    </Box>
  );
}
