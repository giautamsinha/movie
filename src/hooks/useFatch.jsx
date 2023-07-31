import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import { useDispatch } from "react-redux";

const useFatch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const getApiData = async () => {
      try {
        setLoading("Loading...");
        setData(null);
        setError(null);
        const result = await dispatch(fetchDataFromApi(url));
        // console.log("result",result)
        if (result.status === 200) {
          setLoading(false);
          setData(result.data);
        } else {
          setLoading(true);
          setError(result.data);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getApiData();
  }, [url]);

  return { data, loading, error };
};

export default useFatch;
