import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFatch from "../../../hooks/useFatch";


const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFatch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Recommendation;