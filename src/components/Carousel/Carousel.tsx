import "./Carousel.scss";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import MatchWeekCard from '../MatchWeekCard/MatchWeekCard';
import { useState } from "react";
import FootballData from "../../type/FootballData";
import { getPrimedFootballData, handleFootballSearch } from "../../helperFunctions/helperFunctions";
import FixtureData from "../../type/NewFootballData";

type CarouselPropTypes = {
  heading: string,
  searchData: FootballData[],
  data: FootballData[][],
  url?:string
}

const Carousel = ({ heading, data, searchData, url }: CarouselPropTypes) => {
  const [page, setPage] = useState<number>(1);

  const [userInput, setUserInput] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [userSearchData, setUserSearchData] = useState<FootballData[][]>(data);
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
  }

   const handleLeagueUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearch(false)
    setUserInput(e.target.value)
    setUserSearchData(data)
  }

  const handleLeagueSearch = () => {
    setIsSearch(true)
    const userSearchResult = handleFootballSearch(searchData, userInput);
    setUserSearchData(getPrimedFootballData(userSearchResult))
  }

  const displayedData = isSearch ? userSearchData.slice(sliceStart, sliceEnd) : data.slice(sliceStart, sliceEnd);

  return (
    <div className="carousel-search-container">

      <div className="search-container">
        <input type="text" placeholder='search Ligue teams...' onChange={handleLeagueUserInput} />
        <button onClick={handleLeagueSearch}>Search</button>
      </div>

      <div className="carousel-container">
        <h2>{heading}</h2>
        <div className="carousel-container__carousel-row">

          <button className="carousel-container__leftbtn" onClick={handleDecrement}>
            <img src={leftArrow} alt="left-arrow" />
          </button>

          {displayedData.map((gameWeekData, i) => {
            if (gameWeekData.length){
              return (
                <div key={i} className="carousel-container__matchweek-info">
                  <h3>Game Week {gameWeekData[i]?.intRound}</h3>
                  <MatchWeekCard data={gameWeekData} url={url} />
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
    </div>
  )
}

export default Carousel;