export function renderAlarmTime(minuteNumber) {
  const hours = ~~(minuteNumber / 60); // eslint-disable-line
  const minutes = minuteNumber % 60;
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}
export function renderAlarmString(hours, minutes) {
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

export function stringifyWD(daysOfWeek) {
  return daysOfWeek.map(
    (e = '') =>
      ({
        1: 'Sunday',
        2: 'Monday',
        3: 'Tuesday',
        4: 'Wednesday',
        5: 'Thursday',
        6: 'Friday',
        7: 'Saturday',
      }[e])
  );
}
export function renderWeekdayString(daysOfWeek = []) {
  const len = daysOfWeek.length;
  const sun = daysOfWeek.indexOf(1);
  const sat = daysOfWeek.indexOf(7);
  if (len === 7) {
    return 'Every Day';
  } else if (len === 5 && sun === -1 && sat === -1) {
    return 'Every Weekday';
  } else if (len === 1) {
    return `Every ${stringifyWD(daysOfWeek).toString()}`;
  } else if (len === 2 && sun !== -1 && sat !== -1) {
    return 'Every Weekends';
  }
  daysOfWeek.sort();
  return stringifyWD(daysOfWeek)
    .map(e => e.substring(0, 3))
    .join(' ');
}

export function renderAlarmLabel(label = 'Alarm', daysOfWeek = []) {
  const dayString = renderWeekdayString(daysOfWeek);
  return `${label}${dayString.length < 1 ? '' : ', '}${dayString}`;
}

export function createHoursArr(number = 24) {
  const hours = [];
  const threshold = typeof number === 'number' && number === 12 ? 12 : 24;
  for (let i = 0; i <= threshold; i += 1) {
    hours.push(i);
  }
  return hours;
}
export function createMinutesArr() {
  const minutes = [];
  for (let i = 0; i <= 60; i += 1) {
    minutes.push(i);
  }
  return minutes;
}
export function createWeekdaysArr() {
  const weekdays = [];
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  for (let i = 0; i <= 6; i += 1) {
    weekdays.push({ id: i + 1, name: dayName[i] });
  }
  return weekdays;
}
export function getTimeUnits() {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    totalMinutes: now.getHours() * 60 + now.getMinutes(),
    day: now.getDay() + 1,
  };
}
export const hoursArr = createHoursArr();
export const minutesArr = createMinutesArr();
export const weekdaysArr = createWeekdaysArr();
export function logicWeekday(checked, prevArr = [], value) {
  let newArr;
  if (checked) {
    newArr = [...prevArr, value];
  } else {
    newArr = prevArr.filter(e => e !== value);
  }
  return newArr;
}
export const imageAssets = {
  spoonLogo: require('../assets/imgs/spoon.png'), // eslint-disable-line
};
