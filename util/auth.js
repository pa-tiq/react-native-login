import axios from 'axios';
const keys = require('../keys.json');

const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const URL_Signup = `signUp?key=${keys.firebase_API_key}`;
const URL_Login = `signInWithPassword?key=${keys.firebase_API_key}`;

export async function createUser(email, password) {
  const response = await axios.post(URL + URL_Signup, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}
export async function login(email, password) {
  const response = await axios.post(URL + URL_Login, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}
