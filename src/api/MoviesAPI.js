/**
 * Get a list of the top rated TV shows on TMDb.
 */
import Constants from "../util/constants/Constants";

/**
 * http://www.mocky.io/v2/5e03c349310000dea86b2cb9
 * @returns {Promise<R>}
 */
export const fetchTopRatedMovieList = () => {
	return new Promise((resolve, reject) => {
		let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "movie/top_rated?api_key=" + Constants.THEMOVIEDB_API_KEY;
		fetch(REQUEST_URL, {
			method : "GET",
		}).then(response => response.json()).then(responseData => {
			resolve(responseData);
		}).catch(() => {
			//error
			resolve(null);
		}).done()
	});
};

/**
 * http://www.mocky.io/v2/5e03c3c63100002ac26b2cba
 * @returns {Promise<R>}
 */
export const fetchNowPlayingMovieList = () => {
	return new Promise((resolve, reject) => {
		let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "movie/now_playing?api_key=" + Constants.THEMOVIEDB_API_KEY;
		fetch(REQUEST_URL, {
			method : "GET",
		}).then(response => response.json()).then(responseData => {
			resolve(responseData);
		}).catch(() => {
			//error
			resolve(null);
		}).done()
	});
};


/**
 * http://www.mocky.io/v2/5e03997d31000008156b2c76
 * @returns {Promise<R>}
 */
export const fetchPopularMovieList = () => {
	return new Promise((resolve, reject) => {
		let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "movie/popular?api_key=" + Constants.THEMOVIEDB_API_KEY;
		fetch(REQUEST_URL, {
			method : "GET",
		}).then(response => response.json()).then(responseData => {
			resolve(responseData);
		}).catch(() => {
			//error
			resolve(null);
		}).done()
	});
};
