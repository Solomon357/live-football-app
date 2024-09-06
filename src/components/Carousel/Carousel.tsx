import "./Carousel.scss";

import MatchWeekCard from '../MatchWeekCard/MatchWeekCard';
import { useEffect, useState } from "react";
type CarouselPropTypes = {
  heading: string
}

const Carousel = ({ heading }: CarouselPropTypes) => {

  const [mockMatchWeekData, setMockMatchWeekData] = useState<number[]>([]);

  useEffect(() => {
    setMockMatchWeekData([0,1,2])
  },[])

  return (
    <div className="carousel-container">
      <h2>{heading} Matches</h2>
      {mockMatchWeekData.map((matchWeekData) => {
        return <MatchWeekCard key={matchWeekData} />
      })}
      
      <div className="card-container">
        

      </div>
    </div>
  )
}

export default Carousel;