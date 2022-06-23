function symbol(measurement, units) {
  switch (measurement) {
    case "temperature":
      return units === "metric" ? "°C" : "°F";
    case "speed":
      return units === "metric" ? "m/s" : "m/h";
    default:
      throw Error("unexpected measurement in getUnits.symbol", measurement);
  }
}

export default symbol;
