import React from 'react';

function WeatherSymbol({
  weatherIconCode, description, width, height,
}) {
  const imageURL = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  const style = { width: `${width}`, height: `${height}` };
  const st = {
    width: '20',
    height: '20',
  };

  return (
    <figure>
      <img src={imageURL} alt={description} style={style} />
      <figcaption>{description}</figcaption>
    </figure>
  );
}

export default WeatherSymbol;
