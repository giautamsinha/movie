import "./style.scss";
import { fetchDataFromApi } from "../../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const dispatch = useDispatch();

  const fetchInitialData = async () => {
    setLoading(true);
    const { data } = await dispatch(
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    );
    setData(data);
    setPageNum((prev) => prev + 1);
    setLoading(false);
  };


  const fetchNextPageData = async () => {
    const  nextPageData  = await dispatch(
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    );

    if(data?.results){
      setData({
        ...data, results: [...data?.results , ...nextPageData?.data?.results]
      })
    }else{
      setData(nextPageData?.data)
    }

    setPageNum((prev) => prev + 1)

  };

  console.log("datadata", data);
  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query]);
  return (
    <>
      <div className="searchResultsPage">
        {loading && <Spinner initial={true} />}
        {!loading && (
          <ContentWrapper>
            {data?.results?.length > 0 ? (
              <>
                <div className="pageTitle">
                  {`Search ${
                    data.total_results > 1 ? "results" : "result"
                  } of '${query}'`}
                </div>
                <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
                >
                  {data?.results?.map(( item ,index)=>{ if(item?.media_type === 'person') return
                
                return (
                  <MovieCard key={index} data={item} fromSearch={true} />
                )
                })}
                </InfiniteScroll>
              </>
            ) : (
              <>
                <span className="resultNotFound">Sorry Results not found!</span>
              </>
            )}
          </ContentWrapper>
        )}
      </div>
    </>
  );
};

export default SearchResult;

// 6:05