import axios from 'axios';

const API_URL = process.env.VUE_APP_API_HOST;

const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/user/register/`, {
    name: name,
    email: email,
    password: password,
  });
  return { user: response.data, token: response.headers.authtoken };
};

export { registerUser };
