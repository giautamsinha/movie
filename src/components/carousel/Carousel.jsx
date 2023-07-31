import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
import Geners from "../geners/Geners";

const Carousel = ({ data, loading , endPoint , title}) => {
  // console.log("**********", data);
  // console.log("***************", loading);
  const navigate = useNavigate();
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  // console.log("***************", url);

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        { title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={()=>navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={()=>navigation('right')}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer} >
            {data?.map((value) => {
              const posterUrl = value?.poster_path
                ? url?.poster + value?.poster_path
                : PosterFallback;
              return (
                <div key={value.id} className="carouselItem" onClick={()=> navigate(`/${value.media_type || endPoint}/${value.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={value?.vote_average.toFixed(1)} />
                    <Geners genersid={value?.genre_ids.slice(0, 2)} />
                  </div>

                  <div className="textBlock">
                    <span className="title">{value?.title || value?.name}</span>
                    <span className="date">
                      {dayjs(value?.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
// 4:9
