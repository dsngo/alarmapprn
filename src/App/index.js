import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import { Provider } from 'react-redux';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import MainTabNavigator from '../routes';
import store from '../redux/store';

const { UIManager } = NativeModules;

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: COLOR.pink500,
  },
};

class App extends Component {
  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={uiTheme}>
          <MainTabNavigator />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
