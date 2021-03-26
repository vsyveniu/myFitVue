import axios from 'axios';

const API_URL = `http://${process.env.VUE_APP_API_HOST}`;

const fetchChain = async user_id => {
  const response = await axios.get(`${API_URL}/user/chain/${user_id}`);
  return { response };
};

export { fetchChain };
