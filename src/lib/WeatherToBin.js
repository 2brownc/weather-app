function WeatherToBin(weatherInfo, key, toolTipValues, limit) {
  const binData = [];
  const tooltips = [];

  for (let i = 0; i < limit; i += 1) {
    const bin = i;
    const bins = [
      {
        bin: i,
        count: weatherInfo[i][key],
      },
    ];

    binData.push({ bin, bins });
    tooltips.push(toolTipValues(weatherInfo[i][key], i + 1));
  }

  return { binData, tooltips };
}

export default WeatherToBin;
