import React, { Component } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
				<View style={styles.content} />
				<View style={styles.header}>
					<Text style={styles.headerText}> Profile </Text>
				</View>
				<View style={styles.body}>
					<Image source={require("../../assets/images/user.png")} style={styles.image} />
					<Text style={styles.text}>AppLogist</Text>
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	},
	content: {
		flex:0.15,
	},
	header: {
		flex:.1,
	},
	headerText: {
		fontSize: 27,
		fontWeight: '600',
		paddingLeft:20
	},
	body: {
		alignItems: 'center',
	},
	image: {
		height:100,
		width:100,
		borderWidth: 1,
		borderRadius:50,
	},
	text: {
		fontSize: 24,
		fontWeight: '500',
		marginTop:10
	}

});
