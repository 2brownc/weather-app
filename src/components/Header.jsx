import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { WeatherAlertButton } from './WeatherAlert';
import { ShowSettingsMenuButton } from './SettingsMenu';

function DialogControl({
  menuLocation, setMenuLocation, menuUnits, setMenuUnits,
}) {
  return (
    <>
      <Button variant="outlined">Primary</Button>
      <Button variant="contained">Contained</Button>
    </>
  );
}

function GitHubButton({ link }) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="View Source Code">
        <Button variant="contained" href={link} target="_blank">
          <GitHubIcon />
        </Button>
      </Tooltip>
    </Box>
  );
}

function Header({
  heading,
  gitLink,
  weatherAlert,
  weather,
  setOpenSettingsMenu,
}) {
  const [validWeatherInfo, setValidWeatherInfo] = React.useState(false);

  React.useEffect(() => {
    if (weather === null || weather === undefined) {
      setValidWeatherInfo(false);
    } else {
      setValidWeatherInfo(true);
    }
  }, [weather, setValidWeatherInfo]);

  const showWeatherAlertButton = validWeatherInfo && Object.keys(weather.alerts).length !== 0;

  return (
    <AppBar
      position="static"
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            gap: '10px',
          }}
        >
          <WbSunnyIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
            }}
          />
          <span>{heading}</span>
          <Box sx={{ flexGrow: 1 }} />
          {validWeatherInfo
            && (
            <>
              <ShowSettingsMenuButton
                setOpenSettingsMenu={setOpenSettingsMenu}
              />
              <WeatherAlertButton
                setOpen={weatherAlert.setOpenWeatherAlert}
                open={weatherAlert.openWeatherAlert}
                show={showWeatherAlertButton}
              />
            </>
            )}
          <GitHubButton link={gitLink} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
