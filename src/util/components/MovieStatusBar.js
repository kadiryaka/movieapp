import React, { Component } from 'react';
import {StatusBar, StyleSheet, Text, View, Platform, Image, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight;

export default class MovieStatusBar extends Component {

  constructor(props) {
    super();
    this.state = {
      ...props
    };
  }

  navigatePop = () => {
    this.props.navigate.goBack();
  };

  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" translucent backgroundColor={'transparent'}/>
        <View style={styles.barView}>
          <TouchableOpacity style={styles.iconView} onPress={ () => this.navigatePop()}>
            <Icon style={styles.icon} color={'#fff'} name={'chevron-left'} size={30} />
            <Text style={styles.text}>  Back</Text>
          </TouchableOpacity>
          <View style={styles.share}>
            <Image source={require("../../../assets/icon/share.png")} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: 'transparent',
    marginTop: 50
  },
  barView: {
    padding:10,
    marginLeft:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 30
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  share: {
    marginRight: 10
  }
});
