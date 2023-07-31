import axios from "axios";
import { getApiConfigration } from "../store/homeSlice";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = (url, params = "") => async (dispatch) => {
  try {
    console.log("in api.js url ",url)
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    console.log("in api.js url ***********",data)


    return {data:data , status:200};
  } catch (error) {
    console.log("working in api.js",error.message);
    return {data:error.message , status:400};

  }
};
