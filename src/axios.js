import axios from "axios";

const token = sessionStorage.getItem("token");
axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  Authorization: `Bearer ${token}`,
};
// "https://audiophile-e-commerce.herokuapp.com/"
const instance = axios.create({
  baseURL: "http://localhost:5010",
});

export default instance;
