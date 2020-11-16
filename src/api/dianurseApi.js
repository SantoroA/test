import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://cors-anywhere.herokuapp.com/https://staging-api.thepowow.tech/dianurse/v1'
	//TODO switch between prod and staging depending on environment according to .env
});

// two new variables: one for production and one forstaging
const PROD_BASEURL = 'https://api.thepowow.tech/dianurse/v1';
const STAGING_BASEURL = 'https://staging-api.thepowow.tech/dianurse/v1';

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
