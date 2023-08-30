export const formatDate = (date: string): [string, string] => {
  const [monthDate] = date.split(',', 1);
  const [month, dayDate] = monthDate.split(' ', 2);

  return [month, dayDate];
};
