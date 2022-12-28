import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import LocationSelector from './LocationSelect';

import {
  getLocationFromIP,
} from '../features/getLocationFromIP/getLocationFromIPSlice';

import {
  fetchLocationFromBrowser,
  fetchLocationFromBrowserError,
  locationFromBrowserStatus,
} from '../features/locationFromBrowser/locationFromBrowserSlice';

import {
  geoLocationStatus,
} from '../features/geoLocation/geoLocationSlice';

import {
  weatherStatus,
} from '../features/weather/weatherSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DialogControl({
  selectedLocation,
  selectedUnits,
  setLocation,
  setUnits,
  setShowMenuDialog,
  units,
}) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Button
        variant="outlined"
        onClick={() => { setShowMenuDialog(false); }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setShowMenuDialog(false);
          if (selectedLocation !== null && selectedLocation !== undefined) {
            setLocation(selectedLocation);
          }

          if (selectedUnits !== null && selectedUnits !== undefined) {
            setUnits(selectedUnits);
          } else {
            setUnits(units);
          }
        }}
      >
        Okay
      </Button>
    </Stack>
  );
}

function ShowSettingsMenuButton({ setOpenSettingsMenu }) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open Settings Menu">
        <Button
          variant="contained"
          onClick={() => {
            setOpenSettingsMenu(true);
          }}
        >
          <SettingsIcon />
        </Button>
      </Tooltip>
    </Box>

  );
}

function GetLocationFromBrowser({
  dispatch,
  setBrowserGeoLocStatus,
  setSelectedLocation,
  setLocSelInputValue,
}) {
  const [newLoc, setNewLoc] = useState(false);

  const locationBrowserStatus = useSelector(locationFromBrowserStatus);

  useEffect(() => {
    if (locationBrowserStatus === 'FAILED' && newLoc === true) {
      const IPDATA_KEY = `${process.env.REACT_APP_IPDATA_KEY}`;
      dispatch(getLocationFromIP({ IPDATA_KEY }));
    }
  }, [dispatch, newLoc, locationBrowserStatus]);

  return (
    <IconButton
      aria-label="fingerprint"
      color="secondary"
      onClick={() => {
        const browserLocation = navigator.geolocation;
        if (browserLocation) {
          browserLocation.getCurrentPosition(
            (success) => {
              dispatch(fetchLocationFromBrowser(success));
              setNewLoc(false);
            },
            (failure) => {
              dispatch(fetchLocationFromBrowserError(failure));
              setNewLoc(true);
            },
          );
        } else {
          setBrowserGeoLocStatus(false);
        }
        setSelectedLocation(null);
        setLocSelInputValue(null);
      }}
    >
      <MyLocationIcon />
    </IconButton>
  );
}

function SelectUnits({ setSelectedUnits, units }) {
  const [defaultValue, setDefaultValue] = React.useState(units);

  const handleChange = (event) => {
    setSelectedUnits(event.target.value);
    setDefaultValue(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="select-units-label">Units</InputLabel>
      <Select
        labelId="select-units-label"
        id="select-units"
        value={defaultValue}
        label="Select Units"
        onChange={handleChange}
      >
        <MenuItem value="metric">Metric</MenuItem>
        <MenuItem value="imperial">Imperial</MenuItem>
      </Select>
    </FormControl>
  );
}

export default function SettingsMenu({
  units,
  setUnits,
  openSettingsMenu,
  setOpenSettingsMenu,
  setCurrentLoc,
  setBrowserGeoLocStatus,
}) {
  const dispatch = useDispatch();

  const [selectedUnits, setSelectedUnits] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [locSelInputValue, setLocSelInputValue] = React.useState(null);
  const [showProgressBar, setShowProgressBar] = React.useState(false);

  const weatherCurrentStatus = useSelector(weatherStatus);
  const geoLocationCurrentStatus = useSelector(geoLocationStatus);

  React.useEffect(() => {
    if (
      weatherCurrentStatus !== 'SUCCEDED'
      || geoLocationCurrentStatus !== 'SUCCEDED'
    ) {
      setShowProgressBar(true);
    } else {
      setShowProgressBar(false);
    }
  }, [weatherCurrentStatus, geoLocationCurrentStatus]);

  const handleClose = () => setOpenSettingsMenu(false);

  return (
    <Modal
      open={openSettingsMenu}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Settings
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <LocationSelector
              setLocation={setSelectedLocation}
              value={locSelInputValue}
              setValue={setLocSelInputValue}
            />
          </Grid>
          <Grid item xs={2}>
            <GetLocationFromBrowser
              dispatch={dispatch}
              setBrowserGeoLocStatus={setBrowserGeoLocStatus}
              setSelectedLocation={setSelectedLocation}
              setLocSelInputValue={setLocSelInputValue}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectUnits
              selectedUnits={selectedUnits}
              setSelectedUnits={setSelectedUnits}
              units={units}
            />
          </Grid>
          <Grid item xs={12}>
            <DialogControl
              selectedLocation={selectedLocation}
              selectedUnits={selectedUnits}
              setLocation={setCurrentLoc}
              setUnits={setUnits}
              setShowMenuDialog={setOpenSettingsMenu}
              units={units}
            />
          </Grid>
          <Grid item xs={12}>
            {showProgressBar ? <LinearProgress /> : ' '}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export { ShowSettingsMenuButton };
