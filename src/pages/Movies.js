import React, { Component } from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RenderLoadingView from "../util/components/RenderLoadingView";
import {fetchPopularTVList, fetchTopRatedTVList} from "../api/TVAPI";
import Constants from "../util/constants/Constants";
import LinearGradient from "react-native-linear-gradient";
import {fetchNowPlayingMovieList, fetchPopularMovieList, fetchTopRatedMovieList} from "../api/MoviesAPI";

const posterTextMaxSize = 16;

export default class Movies extends Component {

	constructor(props) {
		super(props);
		this.state = {
			...props,
			topRatedDataSource: [],
			popularDataSource: [],
			nowPlayingDataSource: [],
			isVisible: true
		};
	}

	componentDidMount = () => {
		this.getAllMovieData();
	};

	getAllMovieData = () => {
		this.setState({isVisible: true});
		const promises = [
			fetchTopRatedMovieList(),
			fetchNowPlayingMovieList(),
			fetchPopularMovieList(),
		];
		Promise.all(promises)
			.then(responses => {
				this.setState({
					topRatedDataSource: (responses[0] != null ? responses[0].results : []),
					nowPlayingDataSource: (responses[1] != null ? responses[1].results : []),
					popularDataSource: (responses[2] != null ? responses[2].results : []),
				});
			})
			.catch(e => {
				//error
			})
			.finally(() => this.setState({isVisible: false}));
	};

	preparePosterText = (text) => {
		return (text.length > posterTextMaxSize ? text.toUpperCase().substring(0,posterTextMaxSize) + "..." : text.toUpperCase());
	};

	navigateMovieDetail = (movieDetail) => {
		this.props.navigation.navigate({ routeName: 'RouteMovieDetail', params: { movie: movieDetail }});
	};

	renderMovieList() {
		return (
			<View style={styles.container}>
				<View style={styles.content} />

				<ScrollView style={{flex:.9}}>

					<Text style={styles.headerText}>TOP RATED MOVIES</Text>
					<FlatList
						data={this.state.topRatedDataSource}
						renderItem={this.renderTopRatedItem}
						extraData={this.state}
						keyExtractor={(item, index) => String(index)}
						style={styles.movieList}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					/>

					<Text style={styles.headerSubText}>Now Playing</Text>
					<FlatList
						data={this.state.nowPlayingDataSource}
						renderItem={this.renderNowPlayingItem}
						extraData={this.state}
						keyExtractor={(item, index) => String(index)}
						style={styles.movieList}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					/>

					<Text style={styles.headerSubText}>Popular</Text>
					<FlatList
						data={this.state.popularDataSource}
						renderItem={this.renderPopularItem}
						extraData={this.state}
						keyExtractor={(item, index) => String(index)}
						style={styles.movieList}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					/>

				</ScrollView>

			</View>
		);
	}

	renderTopRatedItem = (item) => {
		const topRated = item.item;
		let posterUrl = Constants.THEMOVIEDB_API_ENDPOINT_IMAGE_BACKDROP + topRated.backdrop_path;
		return (
			<TouchableOpacity onPress={ () => this.navigateMovieDetail(topRated)}>
				<View>
					<Image source={{uri: posterUrl}} style={styles.posterPopular} />
				</View>
			</TouchableOpacity>
		);
	};

	renderNowPlayingItem = (item) => {
		const nowPlaying = item.item;
		let posterUrl = Constants.THEMOVIEDB_API_ENDPOINT_IMAGE_VERTICAL + nowPlaying.poster_path;
		return (
			<TouchableOpacity onPress={ () => this.navigateMovieDetail(nowPlaying)}>
				<View style={styles.posterView}>
					<Image source={{uri: posterUrl}} style={styles.posterTV} />
				</View>
				<Text style={styles.posterName}>{this.preparePosterText(nowPlaying.title)}</Text>
			</TouchableOpacity>
		);
	};

	renderPopularItem = (item) => {
		const popular = item.item;
		let posterUrl = Constants.THEMOVIEDB_API_ENDPOINT_IMAGE_VERTICAL + popular.poster_path;
		let ratingTextList = popular.vote_average.toString().split(".");
		return (
			<TouchableOpacity onPress={ () => this.navigateMovieDetail(popular)}>
				<View style={styles.posterView}>
					<Image source={{uri: posterUrl}} style={styles.posterTV} />
					<LinearGradient colors={["#f89300", "#dd2b67"]} style={styles.ratingView}>
						<Text style={styles.ratingText}>{ratingTextList[0]}</Text>
						{ ratingTextList[1] && <View style={styles.ratingViewRight}><Text style={styles.ratingTextRight}>{"." + ratingTextList[1]}</Text></View>}
					</LinearGradient>
				</View>
				<Text style={styles.posterName}>{this.preparePosterText(popular.title)}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		if (this.state.isVisible) {
			return (<RenderLoadingView/>);
		}
		return this.renderMovieList();
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	},
	content: {
		flex:0.1,
	},
	header: {
		flex:.1,
	},
	headerText: {
		fontSize: 22,
		fontWeight: '600',
		paddingLeft:25
	},
	body: {
		alignItems: 'center',
	},
	posterTV: {
		height:225,
		width:150,
		borderWidth: 1,
		borderColor:'transparent',
		borderRadius:6,
		marginHorizontal:10,
	},
	text: {
		fontSize: 24,
		fontWeight: '500',
		marginTop:10,
	},
	movieList: {
		marginHorizontal: 20,
		marginVertical:20,
	},
	posterView: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 5,
		shadowOpacity: 0.7,
		elevation: 2,
	},
	posterName: {
		fontSize: 15,
		color: 'black',
		textAlign: 'center',
		fontWeight: '600',
		marginTop: 15,
	},
	posterNamePopular: {
		fontSize: 15,
		color: 'black',
		textAlign: 'left',
		fontWeight: '600',
		marginTop: 10,
		marginBottom: 15,
		marginLeft:5,
	},
	headerSubText: {
		fontSize: 17,
		fontWeight: '600',
		paddingLeft:20,
		color:'#5d5d5d'
	},
	posterPopular: {
		height:160,
		width: (Dimensions.get('window').width-100),
		borderWidth: 1,
		borderColor:'transparent',
		borderRadius:6,
		marginHorizontal:10,
	},
	ratingView: {
		flex:1,
		borderWidth:1,
		borderColor:'transparent',
		borderRadius:70,
		backgroundColor: '#f47721',
		alignSelf: 'flex-start',
		position:'absolute',
		top:10,
		right:20,
		padding:5
	},
	ratingViewRight : {
		position:'absolute',
		top:5,
		right:3
	},
	ratingText: {
		color:'white',
		fontSize:20,
		marginRight:8,
		marginLeft:3,
		fontWeight:'600'
	},
	ratingTextRight: {
		color:'white',
		fontSize:12,
		paddingTop:2
	}

});
