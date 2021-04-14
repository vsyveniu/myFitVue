import axios from 'axios';

console.log(process.env.VUE_APP_API_HOST);

const API_URL = process.env.VUE_APP_API_HOST;

console.log(API_URL);

const getUser = async id => {
  const response = await axios.get(`${process.env.VUE_APP_API_HOST}/user/${id}`);
  console.log('in axios');
  console.log(response.data);
  return response.data;
};

export { getUser };
