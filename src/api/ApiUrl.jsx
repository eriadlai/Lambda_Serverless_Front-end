import axios from "axios";

export const BaseApiUrl = axios.create({
  baseURL: "https://3ls4od9od7.execute-api.us-west-1.amazonaws.com/dev",
});
