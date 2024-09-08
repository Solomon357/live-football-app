import "./Carousel.scss";

import MatchWeekCard from '../MatchWeekCard/MatchWeekCard';
type CarouselPropTypes = {
  heading: string,
  data: number[][];
}

const Carousel = ({ heading, data }: CarouselPropTypes) => {

  return (
    <div className="carousel-container">
      <h2>{heading} Matches</h2>
      <div className="carousel-container__carousel-row">
        {data.map((matchWeekData, i) => {
          return (
            <div key={i} className="carousel-container__matchweek-info">
              <h3>Current Match Week {i}</h3>
              <MatchWeekCard data={matchWeekData} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel;