import axios from "axios";

// "http://localhost:5010"
// "https://audiophile-e-commerce.herokuapp.com"

const instance = axios.create({
  baseURL: "http://localhost:5010",
  withCredentials: true,
});

export default instance;
