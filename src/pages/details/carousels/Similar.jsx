import React from 'react'
import Carousel from '../../../components/carousel/Carousel'
import useFatch from '../../../hooks/useFatch'

const Similar = ({mediaType ,id}) => {
    const{ data, loading} = useFatch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "type" ? "Similar TV Shows" : "Similar Movies";
  return (
    <>
    <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    </>
  )
}

export default Similar