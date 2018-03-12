import { StackNavigator } from 'react-navigation';

// components
// import Settings from './pages/Settings';
import EditAlarm from './pages/EditAlarm';
import AlarmShow from './pages/AlarmShow';
import AlarmShowDetail from './pages/AlarmShowDetail';
// import MedicationShow from './pages/MedicationShow';
import Home from './pages/Home';

const AppNavigator = StackNavigator(
  {
    home: { screen: Home },
    // settings: { screen: Settings },
    editAlarm: { screen: EditAlarm },
    alarmShow: { screen: AlarmShow },
    alarmShowDetail: { screen: AlarmShowDetail },
    // medicationShow: { screen: MedicationShow },

  },
  {
    headerMode: 'none',
  }
);

export default AppNavigator;
