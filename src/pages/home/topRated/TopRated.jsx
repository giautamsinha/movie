import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFatch from "../../../hooks/useFatch";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
const TopRated = () => {
  const [tabChange, setTabChange] = useState("movie");

  const { data, loading } = useFatch(`/${tabChange}/top_rated`);

  const onTabChange = (tab) => {
    setTabChange(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={tabChange} />
    </div>
  );
};

export default TopRated;
