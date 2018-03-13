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
  try {
    const userAlarms = JSON.parse(await AsyncStorage.getItem('userAlarmsData'));
    return dispatch({
      type: 'PULL_DATA_FROM_STORAGE',
      userAlarms,
    });
  } catch (e) {
    return console.log('Cannot find Data');
  }
};

export const saveDataToStorage = () => async (dispatch, getState) => {
  try {
    const dataString = JSON.stringify(await getState().userAlarms);
    return AsyncStorage.setItem('userAlarmsData', dataString)
      .then(() => dispatch({ type: 'SAVE_DATA_TO_STORAGE' }))
      .catch(() => console.log('Error Saving to AsyncStorage'));
  } catch (e) {
    return console.log('Cannot save Data');
  }
};
