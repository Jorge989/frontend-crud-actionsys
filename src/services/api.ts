import axios from "axios";

let api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
