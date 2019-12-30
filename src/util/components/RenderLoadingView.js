import React from 'react';
import { View, StyleSheet, Dimensions, Button } from "react-native";
import Spinner from 'react-native-spinkit';
import EStyleSheet from "react-native-extended-stylesheet";

/**
 * @param isVisible
 * @param size
 * @param type
 * @returns {*}
 * @constructor
 */
const RenderLoadingView = ({ isVisible = true, size = 60,  type = "FadingCircleAlt" }) => {

	return (
		<View style={styles.spinnerContainer}>
			<Spinner
				isVisible={isVisible}
				type={type}
				size={size}
				color={EStyleSheet.value('$appColor')}
			/>
		</View>
	);
};


const styles = StyleSheet.create({
	lottie: {
		width: 65,
		height: 65
	},
	spinnerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});
export default RenderLoadingView;
