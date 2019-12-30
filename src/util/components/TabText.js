import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * color : color of text
 * title: text of title
 */
export default class TabText extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			title: "",
			color: "black",
			focused:false,
			...props
		};
	}

	render() {
		return (
			<View>
					<Text style={[ styles.container,{color: (this.state.focused ? this.state.color : 'yellow')}]}> {this.state.title} </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		fontSize: 12,
		textAlign: 'center',
	}
});
