import { combineReducers } from 'redux';

// const DEFAULT_STATE = {
//   userAlarms: [
//     {
//       id: 234356456,
//       hours: 6,
//       minutes: 7,
//       daysOfWeek: [], // definition: 1 for Sun, 7 for Sat, ed for Every Day, ew for Every Weekday
//       label: 'string',
//       repeat: false,
//       active: false,
//       snooze: true,
//       sound: 'string/to/file/location',
//       description: 'sometext',
//       backgroundImg: 'asfgasgas.jpg'
//     },
//   ],
//   appStatus: {},
// };

const userAlarms = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER_ALARM':
      return [...state, action.newAlarm];
    case 'REMOVE_USER_ALARM':
      return state.filter(e => e.id !== action.alarmId);
    case 'UPDATE_USER_ALARM':
      return state.map(
        e => (e.id === action.alarmId ? { ...action.updatedAlarm } : e)
      );
    case 'PULL_DATA_FROM_STORAGE':
      return [...action.userAlarms];
    default:
      return state;
  }
};

const appStatus = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_APP_STATUS':
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userAlarms,
  appStatus,
});

export default rootReducer;
