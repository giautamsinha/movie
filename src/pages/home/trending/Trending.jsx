import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFatch from "../../../hooks/useFatch";
import "../style.scss";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
const Trending = () => {
  const [tabChange, setTabChange] = useState("day");

  const { data, loading } = useFatch(`/trending/all/${tabChange}`);

  const onTabChange = (tab) => {
    setTabChange(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
