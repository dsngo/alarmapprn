/* eslint no-console: 0 */
import { AsyncStorage } from 'react-native';

// ALARM MANIPULATIONS
export const addUserAlarm = newAlarm => ({ type: 'ADD_USER_ALARM', newAlarm });

export const removeUserAlarm = alarmId => ({
  type: 'REMOVE_USER_ALARM',
  alarmId,
});

export const updateUserAlarm = (alarmId, updatedAlarm) => ({
  type: 'UPDATE_USER_ALARM',
  alarmId,
  updatedAlarm,
});

// STATUS MANIPULATIONS
export const updateAppStatus = (key, value) => ({
  type: 'UPDATE_APP_STATUS',
  key,
  value,
});

//  API CALLS
export const pullDataFromStorage = () => async dispatch => {
  const userAlarms = JSON.parse(await AsyncStorage.getItem('userAlarmsData'));
  // console.log('userAlarm')
  // console.log(userAlarms);
  // console.warn("LOADING")
  return dispatch({
    type: 'PULL_DATA_FROM_STORAGE',
    userAlarms,
  });
};

export const saveDataToStorage = () => async (dispatch, getState) => {
  const dataString = JSON.stringify(await getState().userAlarms);
  // console.log('dataString')
  // console.log(dataString);
  // console.warn('SAVING')
  return AsyncStorage.setItem('userAlarmsData', dataString)
    .then(() => dispatch({ type: 'SAVE_DATA_TO_STORAGE' }))
    .catch(() => console.warn('Error'));
};
