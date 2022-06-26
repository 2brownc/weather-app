import React from 'react';

function WeatherSymbol({
  weatherIconCode, description, width, height,
}) {
  const imageURL = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  const style = { width: `${width}`, height: `${height}` };
  return (
    <figure>
      <img src={imageURL} alt={description} style={style} />
      <figcaption>{description}</figcaption>
    </figure>
  );
}

export default WeatherSymbol;
