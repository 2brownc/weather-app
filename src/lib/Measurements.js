import configureMeasurements, { allMeasures } from 'convert-units';

function measurement(quantity, unit) {
  return {
    quantity,
    unit,
    measurement: `${quantity} ${unit}`,
  };
}

function windInterCardinalDirection(degree) {
  if (!Number.isInteger(degree) || degree > 360) {
    throw Error(`Incorrect value for degree: ${degree}`);
  }

  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];

  const quarter = Math.floor(degree / (360 / 16));

  return directions[quarter];
}

function getMeasurement(measurementName, quantity, units) {
  const convert = configureMeasurements(allMeasures);

  switch (measurementName) {
    case 'temperature':
      if (units === 'metric') {
        const unit = '°C';
        const reqQuantity = convert(quantity).from('K').to('C');

        measurement(reqQuantity, unit);
      } else if (units === 'imperial') {
        const unit = '°F';
        const reqQuantity = convert(quantity).from('K').to('C');

        measurement(reqQuantity, unit);
      }
      break;
    case 'speed':
      if (units === 'metric') {
        const unit = 'm/s';
        const reqQuantity = quantity;

        measurement(reqQuantity, unit);
      } else if (units === 'imperial') {
        const unit = 'mph';
        const reqQuantity = convert(quantity).from('m/s').to('mph');

        measurement(reqQuantity, unit);
      }
      break;
    case 'visibility':
      if (units === 'metric') {
        const unit = 'km';
        const reqQuantity = convert(quantity).from('m').to('km');

        measurement(reqQuantity, unit);
      } else if (units === 'imperial') {
        const unit = 'mi';
        const reqQuantity = convert(quantity).from('m').to('mi');

        measurement(reqQuantity, unit);
      }
      break;
    case 'pressure':
      if (units === 'metric') {
        const unit = 'hPa';
        measurement(quantity, unit);
      } else if (units === 'imperial') {
        const unit = 'mbar';
        const reqQuantity = convert(quantity).from('hPa').to('bar') * 1000;
        measurement(reqQuantity, unit);
      }
      break;
    case 'humidity':
      measurement(quantity, '%');
      break;
    case 'wind_speed':
      if (units === 'metric') {
        measurement(quantity, 'm/s');
      } else if (units === 'imperial') {
        const unit = 'mph';
        const reqQuantity = convert(quantity).from('m/s').to('mph');
        measurement(reqQuantity, unit);
      }
      break;
    case 'wind_deg':
      measurement(quantity, windInterCardinalDirection(quantity));
      break;
    default:
      throw Error(`unexpected measurementName: ${measurementName}, ${quantity}, ${units}`);
  }
}

export default getMeasurement;
