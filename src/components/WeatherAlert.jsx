import React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';

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
  return alerts.map((alert, alertCount) => (
    <Alert
      severity="warning"
      action={alertCount === 0 ? action(setOpen) : null}
      sx={{ mb: 2 }}
    >
      <div className="weatherAlert">
        <div className="alertName">
          {alert.event}
        </div>
        <div className="alertDuration">
          {`${getLocalDateFromUTC(alert.start)} ~ ${getLocalDateFromUTC(alert.end)}`}
        </div>
        <div className="alertText">
          {`${alert.sender_name}: ${alert.description}`}
        </div>
      </div>
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
