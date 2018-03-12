import { AppRegistry } from 'react-native';
import React from 'react';

import App from './App';

export default function index() {
  const Root = () => <App />;
  AppRegistry.registerComponent('alarmapprn', () => Root);
}
