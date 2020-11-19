import axios from 'axios';

const BASE_API_URL = `${process.env.REACT_APP_HOST_API_URL}/dianurse/v1`;
const instance = axios.create({
	baseURL: `https://cors-anywhere.herokuapp.com/${BASE_API_URL}`
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
