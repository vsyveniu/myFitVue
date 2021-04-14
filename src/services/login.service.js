import axios from 'axios';

const API_URL = process.env.VUE_APP_API_HOST;

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login/`, {
    email: email,
    password: password,
  });
  console.log('auth token');
  console.log(response.headers.authtoken);
  return { user: response.data, token: response.headers.authtoken };
};

export { loginUser };
