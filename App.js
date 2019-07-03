/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {Platform, StyleSheet, Text, View} from 'react-native';
import store from './redux/store';
import AppNavigator from './routers/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <AppNavigator />
      </Provider>
    );
  }
}
