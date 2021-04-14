/* due to a local storage's different behaviour in browsers need to send auth
   header after virtual DOM created, not a common way(see main.js 13)
   oserwise token in local storage will be empty */

import axios from 'axios';

const API_URL = process.env.VUE_APP_API_HOST;

const createDaily = async userName => {
  const response = await axios.post(`${API_URL}/chain/`, {
    userName,
  },
   {
    headers: { 'authtoken': localStorage.getItem('authtoken')},  
  });
  return { response };
};

export { createDaily };
