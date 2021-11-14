import axios from "axios";

const token = sessionStorage.getItem("token");
axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  Authorization: `Bearer ${token}`,
};
// "http://localhost:5010"
const instance = axios.create({
  baseURL: "https://audiophile-e-commerce.herokuapp.com/",
});

export default instance;
