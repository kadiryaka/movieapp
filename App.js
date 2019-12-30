import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Router from "./src/Router";
import SplashScreen from "react-native-splash-screen";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default class App extends Component {
  componentDidMount(): void {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Router />
      </View>
    );
  }
}
