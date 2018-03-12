import { combineReducers } from 'redux';

const initialState = {
  setAlarm: 0, // round to minutes in day
  daysOfWeek: [0], // definition: 1 for Sun, 7 for Sat
  active: false,
  sound: '',
  description: '',
};

const userAlarms = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_ALARM':
      return [...state, action.newAlarm];
    case 'REMOVE_USER_ALARM':
      return state.filter((e, i) => i !== action.alarmId);
    case 'UPDATE_USER_ALARM':
      return state.map(
        (e, i) =>
          i === action.alarmId ? { ...e, [action.key]: action.value } : e
      );
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
