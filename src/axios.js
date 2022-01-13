import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://audiophile-e-commerce.herokuapp.com/"
      : "http://localhost:5010",
  withCredentials: true,
});

export default instance;
