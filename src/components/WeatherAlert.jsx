import React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { getLocalDateFromUTC } from '../lib/Dates';

function action(setOpen) {
  return (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setOpen(false);
      }}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );
}

function WeatherAlert({ alerts, setOpen }) {
  const allAlerts = [];

  for (let i = 0; i < Object.keys(alerts).length; i += 1) {
    allAlerts.push(alerts[i]);
  }

  return allAlerts.map((alert, alertCount) => (
    <Alert
      severity="warning"
      action={alertCount === 0 ? action(setOpen) : null}
      sx={{ mb: 2 }}
    >
      <Typography variant="h4" component="h4">
        {alert.event}
      </Typography>
      <Typography variant="subtitle2">
        {`${getLocalDateFromUTC(alert.start)} ~ ${getLocalDateFromUTC(alert.end)}`}
      </Typography>
      <Typography variant="body">
        {`${alert.sender_name}: ${alert.description}`}
      </Typography>
    </Alert>
  ));
}

function WeatherAlertButton({ setOpen, open, show }) {
  if (!show) {
    return null;
  }
  return (
    <Box
      sx={{ flexGrow: 0 }}
    >
      <Tooltip title="Weather Alerts Toggle">
        <Button
          variant="contained"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <WarningIcon />
        </Button>
      </Tooltip>
    </Box>
  );
}

function DisplayWeatherAlert({ alerts, setOpenWeatherAlert, openWeatherAlert }) {
  if (
    alerts === undefined
    || Object.keys(alerts).length === 0
  ) {
    return null;
  }

  return (
    <Collapse in={openWeatherAlert}>
      <Box className="weatherAlertContainer">
        <WeatherAlert alerts={alerts} setOpen={setOpenWeatherAlert} />
      </Box>
    </Collapse>
  );
}

export { DisplayWeatherAlert, WeatherAlertButton };
