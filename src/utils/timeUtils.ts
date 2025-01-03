export const convertToMilitaryTime = (time: string) => {
  const amOrPm = time.split(' ')[1];
  const [hour, minute] = time.split(' ')[0].split(':');
  const militaryHour = convertTimeProper(hour, amOrPm);
  return `${militaryHour}:${minute}`;
};

const convertTimeProper = (hour: string, amOrPm: string): string => {
  if (amOrPm === 'AM') {
    if (hour === '12') {
      return '00';
    }
    return hour;
  } else {
    if (hour === '12') {
      return '12';
    }
    return (parseInt(hour) + 12).toString();
  }
};

export const convertMilitaryToStandard = (time: string | undefined) => {
  if (!time) return 'NO_TIME';
  const [hour, minute, _seconds] = time.split(':');
  const amOrPm = +hour >= 12 ? 'PM' : 'AM';
  const standardHour = +hour % 12 || 12;
  return `${standardHour}:${minute} ${amOrPm}`;
};
