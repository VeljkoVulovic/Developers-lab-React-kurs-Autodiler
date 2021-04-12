import axios from "axios";
//jsonBlob
const server =
  "https://autodilerapi.herokuapp.com";

const instance = axios.create({
  baseURL: server,
});

export default instance;
