import React from 'react';

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
import LocationSelector from './LocationSelect';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

function GetLocationFromBrowser({ locCounter, setLocCounter }) {
  const handleClick = () => {
    setLocCounter(locCounter);
  };

  return (
    <IconButton
      aria-label="fingerprint"
      color="secondary"
      onClick={handleClick}
    >
      <MyLocationIcon />
    </IconButton>
  );
}

function SelectUnits({ units, setUnits }) {
  const handleChange = (event) => {
    setUnits(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="select-units-label">Units</InputLabel>
      <Select
        labelId="select-units-label"
        id="select-units"
        value={units}
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
  locCounter,
  setLocCounter,
  units,
  setUnits,
  openSettingsMenu,
  setOpenSettingsMenu,
  setCurrentLoc,
}) {
  const handleClose = () => setOpenSettingsMenu(false);

  return (
    <Modal
      open={openSettingsMenu}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography id="modal-modal-title" variant="h5" component="h5">
              Settings
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <LocationSelector setCurrentLoc={setCurrentLoc} />
          </Grid>
          <Grid item xs={3}>
            <GetLocationFromBrowser locCounter={locCounter} setLocCounter={setLocCounter} />
          </Grid>
          <Grid item xs={12}>
            <SelectUnits units={units} setUnits={setUnits} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export { ShowSettingsMenuButton };
