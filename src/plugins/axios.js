import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_SOME_KEY, 
});

export default instance;