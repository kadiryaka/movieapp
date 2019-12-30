/**
 * Created by root on 8/18/19.
 */
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile from "./pages/Profile";
import TV from "./pages/TV";
import Movies from "./pages/Movies";
import {Image, StyleSheet, Text} from "react-native";
//require for util stylesheet
import MovieStyle from '../src/util/styles/MovieStyle';
import EStyleSheet from "react-native-extended-stylesheet";
import MovieDetail from "./pages/MovieDetail";
import TVDetail from "./pages/TVDetail";

const ProfileStack = createStackNavigator({
  RouteProfileTab: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },
}, {
  defaultNavigationOptions: {

  },
});

const TVStack = createStackNavigator({
  RouteTV: {
    screen: TV,
    navigationOptions: {
      header: null,
    }
  },
  RouteTVDetail: {
    screen: TVDetail,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }
}, {
  defaultNavigationOptions: {

  }
});

TVStack.navigationOptions = ({ navigation }) => {
  //iç sayfalarda tabbar gösterilmeyecek demektir bu.
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
};

const MoviesStack = createStackNavigator({
  RouteMovies: {
    screen: Movies,
    navigationOptions: {
      header: null,
    }
  },
  RouteMovieDetail: {
    screen: MovieDetail,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }
});

MoviesStack.navigationOptions = ({ navigation }) => {
  //iç sayfalarda tabbar gösterilmeyecek demektir bu.
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
};

const TabNavigator = createBottomTabNavigator({
  TabMovies : {
    screen : MoviesStack,
    navigationOptions : {
      tabBarLabel: ({ focused,tintColor }) => <Text style={[styles.tabText,{color: (focused ? tintColor : "gray")}]}> {"MOVIES"} </Text>,
      tabBarIcon: ({ focused }) => ((focused ? <Image source={require("../assets/icon/tab-movies-selected.png")} /> : <Image source={require("../assets/icon/tab-movies.png")} />)),
    }
  },
  TabTV : {
    screen : TVStack,
    navigationOptions : {
      tabBarLabel: ({ focused,tintColor }) => <Text style={[styles.tabText,{color: (focused ? tintColor : 'gray')}]}> {"TV"} </Text>,
      tabBarIcon: ({ focused }) => ((focused ? <Image source={require("../assets/icon/tab-tv-selected.png")} /> : <Image source={require("../assets/icon/tab-tv.png")} />)),
    }
  },
  TabProfile : {
    screen : ProfileStack,
    navigationOptions : {
      tabBarLabel: ({ focused,tintColor }) =>  <Text style={[styles.tabText,{color: (focused ? tintColor : 'gray')}]}> {"PROFILE"} </Text>,
      tabBarIcon: ({ focused }) => ((focused ? <Image source={require("../assets/icon/tab-profile-selected.png")} /> : <Image source={require("../assets/icon/tab-profile.png")} />)),
    }
  }
}, {
  tabBarOptions : {
    activeTintColor: EStyleSheet.value('$appColor'),
    tabStyle: { height:60, paddingTop:10},
  },
  initialRouteName: 'TabMovies',

});

const styles = StyleSheet.create({
  tabText: {
    fontSize: 12,
  }
});


export default createAppContainer(TabNavigator)
