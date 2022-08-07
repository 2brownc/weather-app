function WeatherToBin(weatherInfo, key, toolTipValues, limit) {
  const binData = [];
  const tooltips = [];

  for (let i = 0; i < limit; i += 1) {
    const bin = i;
    const bins = [
      {
        bin: i,
        count: weatherInfo[i][key].quantity ?? weatherInfo[i][key],
      },
    ];

    const time = new Date(weatherInfo[i].dt * 1000);
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    const localTimeOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      timeZone,
    };

    const localTime = time.toLocaleString(undefined, localTimeOptions);

    binData.push({ bin, bins });
    tooltips.push(toolTipValues(weatherInfo[i][key].measurement ?? weatherInfo[i][key], localTime));
  }

  return { binData, tooltips };
}

export default WeatherToBin;
