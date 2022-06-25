function getMonthDateFromNow(days) {
  const currentDate = new Date();
  const date = currentDate.getUTCDate();
  const month = currentDate.getUTCMonth();
  const year = currentDate.getUTCFullYear();

  const requiredDate = new Date(
    Date.UTC(year, month, date) + days * 60 * 60 * 24 * 1000,
  );

  const localDateOptions = {
    month: 'short',
    day: 'numeric',
  };

  return requiredDate.toLocaleDateString(undefined, localDateOptions);
}

export default getMonthDateFromNow;
