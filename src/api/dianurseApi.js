import axios from 'axios';

const instance = axios.create({
	baseURL: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_PROD_BASEURL}`
	//TODO switch between prod and staging depending on environment according to .env
});

// TODO: retrieve token from localhost when opening app

// instance.interceptors.request.use(
// 	async (config) => {
// 		const token = await localStorage.getItem('token');
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(err) => {
// 		return Promise.reject(err);
// 	}
// );

export default instance;
