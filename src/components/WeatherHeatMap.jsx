import { Heatmap } from '@zakodium/react-heatmap';

function getValueArr(hourlyWeather, key, hours) {
  return hourlyWeather.slice(0, hours).map((item) => item[key]);
}

function DayWeatherHeatMap({ hourlyWeather, units }) {
  if (hourlyWeather === null || hourlyWeather === undefined) {
    return;
  }

  const xLabels = [];

  for (let i = 1; i <= 24; i++) {
    xLabels.push(i);
  }

  const yLabels = ['Temperature', 'Humidity', 'Wind Speed'];

  const tempColor1 = '#ae1534';
  const tempColor2 = '#f6b3c0';

  const humidityColor1 = '#004eb3';
  const humidityColor2 = '#9ac6ff';

  const data = [
    getValueArr(hourlyWeather, 'temp', 24),
    getValueArr(hourlyWeather, 'humidity', 24),
    getValueArr(hourlyWeather, 'wind_speed', 24),
  ];

  return (
    <Heatmap
      dimensions={{ height: 100, width: 600 }}
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
    />
  );
}

export default DayWeatherHeatMap;
