import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
	ImageBackground,
	FlatList, ScrollView
} from 'react-native';
import {fetchMovieCreditsById, fetchMovieDetailById} from "../api/MovieDetailAPI";
import Constants from "../util/constants/Constants";
import RenderLoadingView from "../util/components/RenderLoadingView";
import MovieStatusBar from "../util/components/MovieStatusBar";
import {fetchTVCredit, fetchTvDetail} from "../api/TVDetailAPI";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

const emptyStar = require("../../assets/icon/icStar.png");
const selectedStar = require("../../assets/icon/icStarSelected.png");

export default class MovieDetail extends Component {

	constructor(props) {
		super();
		this.state = {
			isVisible: true
		};
	}

	componentDidMount = async() => {
		const { getParam } = this.props.navigation;
		let movie = getParam('tv');
		this.getAllTVData(movie);
	};

	getAllTVData = (tv) => {
		const promises = [
			fetchTvDetail({tvId:tv.id}),
			fetchTVCredit({tvId:tv.id})
		];
		Promise.all(promises)
			.then(responses => {
				let crewAndCast = responses[1].cast;
				crewAndCast.push(...responses[1].crew);
				let selectedStarCount = Math.round(responses[0].vote_average/2);
				let emptyStarCount = 5 - Math.round(responses[0].vote_average/2);
				this.setState({
					backgroundImageUrl :  Constants.THEMOVIEDB_API_ENDPOINT_IMAGE_BACKDROP + responses[0].backdrop_path,
					baseImageUrl :  Constants.THEMOVIEDB_API_ENDPOINT_IMAGE_VERTICAL + responses[0].poster_path,
					tv: responses[0],
					selectedStarSource : this.prepareStarSource(selectedStarCount),
					emptyStarSource : this.prepareStarSource(emptyStarCount),
					castSource: crewAndCast
				});
			})
			.catch(e => {
				//error
			})
			.finally(() => this.setState({isVisible: false}));
	};

	prepareStarSource = (average) => {
		let startList = [];
		for (let i=0; i<average; i++)
			startList.push("");
		return startList;
	};

	renderMovieDetail() {
		let ratingTextList = this.state.tv.vote_average.toString().split(".");

		return (
			<ScrollView>
			<View style={styles.container}>
				<View style={styles.headBackground}>
					<View>
						<ImageBackground source={{uri: this.state.backgroundImageUrl}} style={{width: '100%', height:'100%' }}>
							<MovieStatusBar backgroundColor="#5E8D48" barStyle="light-content" navigate={this.props.navigation}/>
							<LinearGradient colors={["#f89300", "#dd2b67"]} style={styles.playView}>
								<Icon color={'#fff'} name={'play'} size={22} style={styles.iconView} />
							</LinearGradient>
							<View style={styles.titleView}>
								<Text style={styles.title}> {this.state.tv.name.toUpperCase()} </Text>
							</View>
						</ImageBackground>
					</View>
				</View>

				<View style={styles.bordArea}>
					<View style={styles.imageView}>
						<Image source={{uri: this.state.baseImageUrl}} style={styles.baseImage} />
					</View>
					<View style={styles.genres}>
						<Text style={styles.genreText}>
						{
							this.state.tv.genres.map( (genre, i) => {
								return (this.state.tv.genres.length-1 === i) ? genre.name : genre.name + ", "
							})
						}
						</Text>
						<View style={styles.ratingContainer}>

							<View style={styles.ratingView}>
								<Text style={styles.ratingText}>{ratingTextList[0]}</Text>
								{ ratingTextList[1] && <View style={styles.ratingViewRight}><Text style={styles.ratingTextRight}>{"." + ratingTextList[1]}</Text></View>}
							</View>

							{ this.state.selectedStarSource.map((e,i) => { return ( <Image key={i} source={selectedStar} style={styles.starView} />) }) }
							{ this.state.emptyStarSource.map((e,i) => { return ( <Image key={i} source={emptyStar} style={styles.starView} /> ) }) }

						</View>
					</View>
				</View>

				<View style={styles.descriptionView}>
					<Text style={styles.description} numberOfLines={5}>{this.state.tv.overview} </Text>
				</View>

				<View style={styles.crew}>
					<Text style={styles.crewText}>Full Cast & Crew</Text>
				</View>

				<FlatList
					data={this.state.castSource}
					renderItem={this.renderCastItem}
					extraData={this.state}
					keyExtractor={(item, index) => String(index)}
					style={styles.movieList}
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			</ScrollView>

		);
	}

	renderCastItem = (item) => {
		const cast = item.item;
		let imageUrl = Constants.THEMOVIEDB_API_ENDPOINT_IMAGE_CAST + cast.profile_path;
		return (
			<View>
				<View style={styles.castView}>
					<Image source={{uri: imageUrl}} style={styles.castTV} />
				</View>
				<Text style={styles.castName}>{cast.name}</Text>
				<Text style={styles.jobName}>{cast.job}</Text>
			</View>
		);
	};

	render = () => {
		if (this.state.isVisible) {
		  return <RenderLoadingView />
		} else {
			return this.renderMovieDetail();
		}
	};
}

/* <Image
 resizeMode='contain'
 style={{width: w, height: h}}
 source={require('../../../assets/images/about.jpeg')}
 />*/

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingVertical: 50
	},
	headBackground: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: 250,
		width: '100%',
		backgroundColor: 'transparent'
	},
	titleView: {
		position: 'absolute',
		bottom: 20,
		right: 5,
		width: (Dimensions.get('window').width-150),
		alignItems: 'center'
	},
	title: {
		textAlign: 'right',
		fontSize: 18,
		fontWeight: '600',
		color: '#f2f2f2',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 5,
		shadowOpacity: 0.7,
		elevation: 2,
	},
	bordArea: {
		flexDirection: 'row',
		backgroundColor: 'transparent',
		marginTop:120,
		marginLeft:20,
	},
	baseImage: {
		height:180,
		width:120,
		borderWidth: 1,
		borderColor:'transparent',
		borderRadius:6,
	},
	genres: {
		marginTop: 100,
		marginLeft: 30
	},
	genreText: {
		fontSize: 14,
		color: '#555',
		fontWeight: '400'
	},
	imageView: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 5,
		shadowOpacity: 0.7,
		elevation: 2,
	},
	descriptionView: {
		marginTop: 10,

	},
	description: {
		color: '#333',
		fontSize: 18,
		lineHeight: 30,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	crewText: {
		fontSize: 15,
		fontWeight: '600',
		padding:15,
		color:'#5d5d5d'
	},
	crew: {
		backgroundColor: '#f6f6f6'
	},
	castList: {
		marginHorizontal: 20,
		marginVertical:20,
	},
	castView: {
		marginTop: 20
	},
	castName: {
		fontSize: 12,
		color: 'black',
		textAlign: 'center',
		fontWeight: '400',
		marginTop: 10,
	},
	castTV: {
		height:120,
		width:80,
		borderWidth: 1,
		borderColor:'transparent',
		borderRadius:4,
		marginHorizontal:10,
	},
	jobName: {
		fontSize: 12,
		color: '#666',
		textAlign: 'center',
		fontWeight: '400',
		marginTop: 3,
	},
	ratingContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: 15
	},
	ratingView: {
		marginRight: 10
	},
	ratingViewRight : {
		position:'absolute',
		top:1,
		right:-2,
	},
	ratingText: {
		color:'#d7182a',
		fontSize:20,
		marginRight:8,
		marginLeft:3,
		fontWeight:'600'
	},
	ratingTextRight: {
		color:'#d7182a',
		fontSize:12,
		paddingTop:2
	},
	starView: {
		marginHorizontal: 6
	},
	playView: {
		flexDirection:'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius:35
	},
	iconView: {
		padding: 20,
	}
});
