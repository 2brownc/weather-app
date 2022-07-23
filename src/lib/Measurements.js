import { convert } from '@favware/converter';

function measurement(quantity, unit) {
  if (quantity === null) {
    return null;
  }
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
  // assumes all input is in "stadard units"
  // https://openweathermap.org/api/one-call-api#data
  if (quantity === null) {
    return null;
  }
  switch (measurementName) {
    case 'temperature':
      if (units === 'metric') {
        const unit = '°C';
        const reqQuantity = Math.round(convert(quantity, 'k', 'c'));

        return measurement(reqQuantity, unit);
      }
      if (units === 'imperial') {
        const unit = '°F';
        const reqQuantity = Math.round(convert(quantity, 'k', 'f'));

        return measurement(reqQuantity, unit);
      }
      break;
    case 'speed':
      if (units === 'metric') {
        const unit = 'm/s';
        const reqQuantity = quantity;

        return measurement(reqQuantity, unit);
      }
      if (units === 'imperial') {
        const unit = 'mph';
        const reqQuantity = convert(quantity, 'm/s', 'mph').toPrecision(3);

        return measurement(reqQuantity, unit);
      }
      break;
    case 'visibility':
      if (units === 'metric') {
        const unit = 'km';
        const reqQuantity = convert(quantity, 'm', 'km').toPrecision(3);

        return measurement(reqQuantity, unit);
      }
      if (units === 'imperial') {
        const unit = 'mi';
        const reqQuantity = convert(quantity, 'm', 'mi');

        return measurement(reqQuantity.toPrecision(3), unit);
      }
      break;
    case 'pressure':
      if (units === 'metric') {
        const unit = 'hPa';
        return measurement(Math.round(quantity), unit);
      }
      if (units === 'imperial') {
        const unit = 'bar';
        const reqQuantity = Math.round(convert(quantity, 'hpa', 'bar'));

        return measurement(reqQuantity, unit);
      }
      break;
    case 'humidity':
    case 'pop':
      return measurement(Math.round(quantity), '%');
    case 'wind_speed':
      if (units === 'metric') {
        return measurement(quantity.toPrecision(3), 'm/s');
      }
      if (units === 'imperial') {
        const unit = 'mph';
        const reqQuantity = convert(quantity, 'm/s', 'mph');
        return measurement(reqQuantity.toPrecision(3), unit);
      }
      break;
    case 'wind_deg':
      return measurement(`${quantity}°`, windInterCardinalDirection(quantity));
    case 'rain':
    case 'snow':
      if (units === 'imperial') {
        const unit = 'in';
        const reqQuantity = convert(quantity, 'mm', 'in').toPrecision(3);

        return measurement(reqQuantity, unit);
      }
      if (units === 'metric') {
        return measurement(quantity.toPrecision(3), 'mm');
      }
      break;
    default:
      throw Error(`unexpected measurementName: ${measurementName}, ${quantity}, ${units}`);
  }

  return null;
}

export default getMeasurement;
