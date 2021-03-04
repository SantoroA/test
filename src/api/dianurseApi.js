import axios from 'axios';

const instance = axios.create({
	baseURL: `http://localhost:10101/dianurse/v1`
});

export default instance;
