import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import Error from "./pages/404/Error";
import SearchResult from "./pages/searchResult/SearchResult";
import useFatch from "./hooks/useFatch";
import { getApiConfigration } from "./store/homeSlice";
import { getGenres } from "./store/homeSlice";
function App() {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  // const {data,loading} = useFatch("/movie/popular")
  // dispatch(getApiConfigration(data));

  useEffect(() => {
    const getData = async () => {
      const { data } = await dispatch(fetchDataFromApi("/configuration"));
      console.log("working", data);
      const url = {
        backdrop: data?.images?.secure_base_url + "original",
        poster: data?.images?.secure_base_url + "original",
        profile: data?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfigration(url));
    };
    getData();
    genersCall();
  }, []);

  const genersCall = async () => {
    let endPoints = ["tv", "movie"];
    let allGeners = {};

    const fetchGenere = async (url) => {
      try {
        const { data } = await dispatch(fetchDataFromApi(`/genre/${url}/list`));
        return data.genres;
      } catch (error) {
        console.error("Error fetching genre data:", error);
        return [];
      }
    };
    const results = await Promise.all(endPoints.map(fetchGenere));
    console.log("results", results);
    results.map((geners) => {
      return geners.map((genersdata) => {
        return (allGeners[genersdata.id] = genersdata);
      });
    });

    dispatch(getGenres(allGeners));
  };

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:medieaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
