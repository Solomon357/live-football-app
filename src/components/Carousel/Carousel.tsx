import "./Carousel.scss";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import MatchWeekCard from '../MatchWeekCard/MatchWeekCard';
import { useState } from "react";
import FootballData from "../../type/FootballData";

type CarouselPropTypes = {
  heading: string,
  data: FootballData[][];
}

const Carousel = ({ heading, data }: CarouselPropTypes) => {
  const [page, setPage] = useState<number>(1);
  //start and end of my slices will always have a gap of 2
  const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(2);

  const handleIncrement = () => {
    if (sliceEnd < data.length) {
      setPage((page) =>  page + 1);
      setSliceStart((start) =>  start + 2);
      setSliceEnd((end) =>  end + 2);
    }
  };

  const handleDecrement = () => {
    if (sliceStart > 0) {
      setPage((page) => page - 1);
      setSliceStart((start) => start - 2);
      setSliceEnd((start) => start - 2);
    } 
  };

  const displayedData = data.slice(sliceStart, sliceEnd);

  return (
    <div className="carousel-container">
      <h2>{heading} Matches</h2>
      <div className="carousel-container__carousel-row">

        <button className="carousel-container__leftbtn" onClick={handleDecrement}>
          <img src={leftArrow} alt="left-arrow" />
        </button>

        {displayedData.map((gameWeekData, i) => {
          if (gameWeekData.length){
            return (
              <div key={i} className="carousel-container__matchweek-info">
                <h3>Game Week {gameWeekData[i].intRound}</h3>
                <MatchWeekCard data={gameWeekData} />
              </div>
            )
          }  

          return (
            <div key={i} className="carousel-container__matchweek-info">
              <h3>Game Week n/a</h3>
              <p>No Games this week</p>
            </div>
          ) 
        })}

        <button className="carousel-container__rightbtn" onClick={handleIncrement}>
          <img src={rightArrow} alt="right-arrow" />
        </button>
      </div>

      <p> page {page} / {Math.ceil(data.length / 2)} </p>
    </div>
  )
}

export default Carousel;