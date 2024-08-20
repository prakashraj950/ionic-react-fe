import axios from "axios";
  
const ApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
 
// ApiInstance.interceptors.request.use(
//   (request) => {
//     const token =
//       localStorage.getItem("token") != null
//         ? localStorage.getItem("token")
//         : null;
//     request.headers.Authorization = `Bearer ${token}`;
     
//     return request;
//   },
 
//   (err) => {
//     Promise.reject(err);
//   }
// );
 
export default ApiInstance;