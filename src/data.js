const data = [
  {
    id: 12315123125,
    hours: 6,
    minutes: 5,
    daysOfWeek: [], // definition: 1 for Sun, 7 for Sat
    label: 'Alarm 01',
    repeat: false,
    active: true,
    snooze: true,
    description: 'sometext',
    sound: 'string/to/file/location',
  },
  {
    id: 2523462345,
    hours: 17,
    minutes: 56,
    daysOfWeek: [1, 2, 3], // definition: 1 for Sun, 7 for Sat
    label: 'Alarm 02',
    repeat: false,
    active: false,
    snooze: true,
    description: 'sometext',
    sound: 'string/to/file/location',
  },
  {
    id: 223125235,
    hours: 6,
    minutes: 0,
    daysOfWeek: [2], // definition: 1 for Sun, 7 for Sat
    label: 'Alarm 03',
    repeat: false,
    active: false,
    snooze: true,
    description: 'sometext',
    sound: 'string/to/file/location',
  },
];

export default data;
