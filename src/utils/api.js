// using axio for fetching the data from the api

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWNjZDMxNWJmZDU5NzM0NGRlZWE1NzA1MzNkNzQ2MCIsInN1YiI6IjY1NjYxOWQ5MTU2Y2M3MDEyZDU1MmExMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ju8DQJu51djQH-mI-eWEzegccaVjZlyJ2WKvGW4jMI";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      // data destucture here
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
