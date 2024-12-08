// import axios from 'axios';
// import { useContext } from 'react';
// import { AuthContext } from '../context/authContext'; 

// // creating axios object
// const api = axios.create({
//   baseURL: 'http://localhost:3005', // Your server URL (change this if needed)
// });

// // attaching token to requests
// api.interceptors.request.use(
//   (config) => {
    
//     const { token } = useContext(AuthContext); // getting the token stored in the context

//     // attachign the token to the authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;
