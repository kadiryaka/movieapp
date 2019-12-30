/**
 * Get a list of the top rated TV shows on TMDb.
 */
import Constants from "../util/constants/Constants";

/**
 * http://www.mocky.io/v2/5e08ede7300000530081a161
 * @returns {Promise<R>}
 */
export const fetchTvDetail = ({tvId}) => {
	return new Promise((resolve, reject) => {
		if (tvId != null) {
			let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "tv/" + tvId + "?api_key=" + Constants.THEMOVIEDB_API_KEY;
			fetch(REQUEST_URL, {
				method: "GET",
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
export const fetchTVCredit = ({ tvId = null}) => {
	return new Promise((resolve, reject) => {
		if (tvId != null) {
			let REQUEST_URL = Constants.THEMOVIEDB_API_ENDPOINT_V3 + "tv/" + tvId + "/credits?api_key=" + Constants.THEMOVIEDB_API_KEY;
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
