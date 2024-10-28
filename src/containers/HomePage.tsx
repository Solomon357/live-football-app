// import Carousel from "../components/Carousel/Carousel"
import HomeBadge from "../assets/homepage-badge.png";
import LeftArrow from "../assets/left-arrow.png";
import RightArrow from "../assets/right-arrow.png";
// import MatchWeekCard from "../components/MatchWeekCard/MatchWeekCard";
import { useEffect, useState } from "react";
import FixtureData from "../type/NewFootballData";
import { getPrimedFixtureData } from "../helperFunctions/helperFunctions";
import StandingsTable from "../components/StandingsTable/StandingsTable";
import { ClubTableData } from "../type/ClubTableData";
import PlayerTableData from "../type/PlayerTableData";
import PlayerTable from "../components/PlayerTable/PlayerTable";

const HomePage = () => {
	const data = [1,2,3,4,5,6,7,8,9];
	const [page, setPage] = useState<number>(1);
	const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(2);

	const [champMatchData, setChampMatchData] = useState<FixtureData[]>([]);
	const [champStandingsData, setChampStandingsData] = useState<ClubTableData[]>([]);
	const [champScorersData, setChampScorersData] = useState<PlayerTableData[]>([]);
	const [competitionTitle, setCompetitionTitle] = useState<string>("");
	// const [premData, setPremData] = useState<FixtureData[]>([]);


	//TOO MANY REQUESTS, MAX 10 requests per minute
	// pick 10 competitions I like to pull at initial load, then just filter those requests through all my pages


	useEffect(() => {

    const key: string = import.meta.env.VITE_API_KEY;

    let startDate: Date | string =  new Date();
    startDate.setDate((startDate.getDate() - (startDate.getDay() + 4) % 7) -7);

    let endDate: Date | string = new Date();
    endDate.setMonth(startDate.getMonth() + 2);

    startDate = startDate.toISOString().slice(0,10);
    endDate = endDate.toISOString().slice(0,10);

    const accessParams = {
      method: "GET",
      headers: {
        mode: "cors",
        Accept: "application/json",
        "Content-Type": "application/json",
        'X-Auth-Token': key
      }
    }

		const champMatchRequest = fetch(`/api/v4/competitions/CL/matches?dateFrom=${startDate}&dateTo=${endDate}`, accessParams).then(res => res.json());
		const champStandingsRequest = fetch(`/api/v4/competitions/CL/standings`, accessParams).then(res => res.json());
		const champScorersRequest = fetch(`/api/v4/competitions/CL/scorers`, accessParams).then(res => res.json());
    //const premRequest = fetch(`/api/v4/competitions/PL/matches?dateFrom=${startDate}&dateTo=${endDate}`, accessParams).then(res => res.json())

    Promise.all([champMatchRequest, champStandingsRequest, champScorersRequest])
    .then(([champMatchData, champStandingsData , champScorersData]) => {
			setCompetitionTitle(champMatchData.competition.name);
      setChampMatchData(champMatchData.matches)
      setChampStandingsData(champStandingsData.standings[0].table)
      setChampScorersData(champScorersData.scorers)
    })
    .catch((err) => console.log(err))

  }, [])

	const groupedMatchdayData = getPrimedFixtureData(champMatchData);

	console.log("grouped Champions League Data", groupedMatchdayData);
	console.log("Champions League Standings", champStandingsData);
	//i want to sort by assists aswell 
	console.log("Champions League Scorers ", champScorersData);


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
		<section>
			{data ? 
			<>
				<header className='header-img'>
					<img className="league-logo" src={HomeBadge} alt="HomeBadge" />
				</header>

				<section>
					<h2>{competitionTitle}</h2>

					<input type="text" placeholder='search UCL teams...'/>
					<button >Search</button>

					{/* <Carousel heading="UEFA Champions League" /> */}
					<div className="carousel-container">
						<h2>Champs League</h2>
						<div className="carousel-container__carousel-row">

							<button className="carousel-container__leftbtn" onClick={handleDecrement}>
								<img src={LeftArrow} alt="left-arrow" />
							</button>

							{displayedData.map((i) => {
									return (
										<div key={i} className="carousel-container__matchweek-info">
											<h3>Game Week {i}</h3>
											<div> matchweek cards will go here ... </div>
										</div>
									)
							})}

							<button className="carousel-container__rightbtn" onClick={handleIncrement}>
								<img src={RightArrow} alt="right-arrow" />
							</button>
						</div>

						<p> page {page} / {Math.ceil(data.length / 2)} </p>
					</div>

					<StandingsTable tableData={champStandingsData} />

					<PlayerTable tableData={champScorersData} />

				</section>
			</>
			:
			<p>Loading...</p>
			}
		</section>
	)
}

export default HomePage