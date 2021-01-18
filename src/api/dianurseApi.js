import axios from 'axios';

const BASE_API_URL = `${process.env.REACT_APP_HOST_API_URL}/dianurse/v1`;
const instance = axios.create({
	baseURL: `http://localhost:10101/dianurse/v1`
});

export default instance;
