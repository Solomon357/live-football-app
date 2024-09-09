import "./Carousel.scss";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";

import MatchWeekCard from '../MatchWeekCard/MatchWeekCard';
import { useState } from "react";
type CarouselPropTypes = {
  heading: string,
  data: number[][];
}

const Carousel = ({ heading, data }: CarouselPropTypes) => {
  const [page, setPage] = useState<number>(1);
  //start and end of my slices will always have a gap of 3
  const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(3);

  // I want to display max 3 items at a time.
  // I already know for the initial render I can use .slice() to get 3 things to display.
  // slice method will already handle if ending index is greater than data.length 
  // which means all I need to do is to handel the increment of slices with handleIncrement and Decrement.
  
  const displayedData = data.slice(sliceStart, sliceEnd);
  // console.log(displayedData)

  const handleIncrement = () => {
    if (sliceEnd < data.length) {
      setPage((counter) =>  counter + 1);
      setSliceStart((start) =>  start + 3);
      setSliceEnd((end) =>  end + 3);
    }
  };

  const handleDecrement = () => {
    if (sliceStart > 0) {
      setPage(page - 1);
      setSliceStart((start) => start - 3);
      setSliceEnd((start) => start - 3);
    } 
  };

  return (
    <div className="carousel-container">
      <h2>{heading} Matches</h2>
      <div className="carousel-container__carousel-row">

        <button className="carousel-container__leftbtn" onClick={handleDecrement}>
          <img src={leftArrow} alt="left-arrow" />
        </button>

        {displayedData.map((matchWeekData, i) => {
          return (
            <div key={i} className="carousel-container__matchweek-info">
              <h3>Current Match Week {i}</h3>  {/* The actual data will have the real matchday as an attribute so i dont need to rely on index*/}
              <MatchWeekCard data={matchWeekData} />
            </div>
          )
        })}

        <button className="carousel-container__rightbtn" onClick={handleIncrement}>
          <img src={rightArrow} alt="right-arrow" />
        </button>
      </div>

      <p> page {page} / {Math.ceil(data.length / 3)} </p>
    </div>
  )
}

export default Carousel;