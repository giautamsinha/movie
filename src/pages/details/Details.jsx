import "./style.scss";
import useFatch from "../../hooks/useFatch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
const Details = () => {
  const { medieaType, id } = useParams();
  const { data, loading } = useFatch(`/${medieaType}/${id}/videos`);
  const { data: credits, loading: creditsLoadung } = useFatch(
    `/${medieaType}/${id}/credits`
  );

  console.log("data", data);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoadung} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={medieaType} id={id} />
      <Recommendation  mediaType={medieaType} id={id} />
    </div>
  );
};

export default Details;
