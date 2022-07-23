import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function getPlaceName(properties) {
  const locations = [];

  if (properties.city !== undefined) {
    locations.push(properties.city);
  }
  if (properties.state !== undefined) {
    locations.push(properties.state);
  }
  if (properties.country !== undefined) {
    locations.push(properties.country);
  }
  if (properties.postcode !== undefined) {
    locations.push(properties.postcode);
  }

  return locations.join(', ');
}

function LocListSecondLine({ properties }) {
  return (<span>{getPlaceName(properties)}</span>);
}

export default function LocationSelector({ setCurrentLoc, limit = 10 }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetchLocSuggestions = React.useCallback(() => {
    if (inputValue === undefined || inputValue === null) {
      return;
    }

    const API_ENDPOINT = `https://photon.komoot.io/api/?q=${inputValue}&limit=${limit}`;

    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((result) => setOptions(result.features))
      .catch(null);
  }, [inputValue]);

  React.useEffect(() => {
    fetchLocSuggestions();
  }, [fetchLocSuggestions]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) => `${option.properties.name}, ${getPlaceName(option.properties)}`}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setCurrentLoc(
          {
            longitude: newValue.geometry.coordinates[0],
            latitude: newValue.geometry.coordinates[1],
          },
        );
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Location" fullWidth />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Grid container alignItems="center">
            <Grid item>
              <Box
                component={LocationOnIcon}
                sx={{ color: 'text.secondary', mr: 2 }}
              />
            </Grid>
            <Grid item xs>
              <span>{option.properties.name}</span>
              <Typography variant="span" color="text.secondary" sx={{ textStyle: 'italic', fontSize: 'small' }}>
                {` (${option.properties.osm_value ?? ''})`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <LocListSecondLine properties={option.properties} />
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}
