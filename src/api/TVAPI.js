/**
 * Get a list of the top rated TV shows on TMDb.
 */
import Constants from "../util/constants/Constants";

/**
 * http://www.mocky.io/v2/5e0399ba3100005b006b2c77
 * @returns {Promise<R>}
 */
export const fetchTopRatedTVList = () => {
	return new Promise((resolve, reject) => {
		let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "tv/top_rated?api_key=" + Constants.THEMOVIEDB_API_KEY;
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
export const fetchPopularTVList = () => {
	return new Promise((resolve, reject) => {
		let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "tv/popular?api_key=" + Constants.THEMOVIEDB_API_KEY;
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
