/**
 * Get a list of the top rated TV shows on TMDb.
 */
import Constants from "../util/constants/Constants";

/**
 * http://www.mocky.io/v2/5e0867793000007b0081a0a8
 * @returns {Promise<R>}
 */
export const fetchMovieDetailById = ({ movieId = null}) => {
	return new Promise((resolve, reject) => {
		if (movieId != null) {
			let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "movie/" + movieId + "?api_key=" + Constants.THEMOVIEDB_API_KEY;
			fetch(REQUEST_URL, {
				method : "GET",
			}).then(response => response.json()).then(responseData => {
				resolve(responseData);
			}).catch(() => {
				//error
				resolve(null);
			}).done()
		} else {
			resolve(null);
		}
	});
};

/**
 * http://www.mocky.io/v2/5e0868dd3000007b0081a0ab
 * @returns {Promise<R>}
 */
export const fetchMovieCreditsById = ({ movieId = null}) => {
	return new Promise((resolve, reject) => {
		if (movieId != null) {
			let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "movie/" + movieId + "/credits?api_key=" + Constants.THEMOVIEDB_API_KEY;
			fetch(REQUEST_URL, {
				method : "GET",
			}).then(response => response.json()).then(responseData => {
				resolve(responseData);
			}).catch(() => {
				//error
				resolve(null);
			}).done()
		} else {
			resolve(null);
		}
	});
};
