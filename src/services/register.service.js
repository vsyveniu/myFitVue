import axios from 'axios';

const API_URL = `http://${process.env.VUE_APP_API_HOST}`;

const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/user/register/`, {
    name: name,
    email: email,
    password: password,
  });
  console.log('in axios');
  console.log(response.headers);
  console.log(response.data);
  return { user: response.data, token: response.headers.authorization };
};

export { registerUser };
