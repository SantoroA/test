import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://cors-anywhere.herokuapp.com/https://api.thepowow.tech/dianurse/v1'
});

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
