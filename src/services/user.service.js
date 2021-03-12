import axios from 'axios';

console.log(process.env.VUE_APP_API_HOST);

const API_URL = `http://${process.env.VUE_APP_API_HOST}`;

console.log(API_URL);

const getUser = async id => {
  const response = await axios.get(`${process.env.VUE_APP_API_HOST}/user/${id}`);
  console.log('in axios');
  console.log(response.data);
  return response.data;
};

const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login/`, {
    email: email,
    password: password,
  });
  console.log('in axios');
  console.log(response.headers);
  console.log(response.data);
  return ({ user:response.data, token: response.headers.authorization});
};

export { getUser, loginUser };
