import axios from 'axios';

const API_URL = `http://${process.env.VUE_APP_API_HOST}`;

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login/`, {
    email: email,
    password: password,
  });
  return { user: response.data, token: response.headers.authorization };
};

export { loginUser };
