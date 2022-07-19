function getMonthDateFromNow(days) {
  const currentDate = new Date();
  const date = currentDate.getUTCDate();
  const month = currentDate.getUTCMonth();
  const year = currentDate.getUTCFullYear();

  const requiredDate = new Date(
    // multiply with 1000 because that's how openweathermap issues dates
    Date.UTC(year, month, date) + days * 60 * 60 * 24 * 1000,
  );

  const localDateOptions = {
    month: 'short',
    day: 'numeric',
  };

  return requiredDate.toLocaleDateString(undefined, localDateOptions);
}

function getLocalDateFromUTC(utc) {
  // multiply with 1000 because that's how openweathermap issues dates
  const date = new Date(utc * 1000);
  const localDateOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return date.toLocaleDateString(undefined, localDateOptions);
}

export { getMonthDateFromNow, getLocalDateFromUTC };
