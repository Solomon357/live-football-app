import '../App.scss';
import { useEffect, useState } from "react";
import FixtureData from "../type/FixtureData";
import { getPrimedFixtureData } from "../helperFunctions/helperFunctions";
import StandingsTable from "../components/StandingsTable/StandingsTable";
import { ClubData } from "../type/ClubData";
import PlayerTable from "../components/PlayerTable/PlayerTable";
import Carousel from '../components/Carousel/Carousel';
import PlayerData from '../type/PlayerData';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
	
	const [competitionTitle, setCompetitionTitle] = useState<string>("");
	const [competitionBadge, setCompetitionBadge] = useState<string>("");

	const [champMatchData, setChampMatchData] = useState<FixtureData[]>([]);
	const [champStandingsData, setChampStandingsData] = useState<ClubData[]>([]);
	const [champScorersData, setChampScorersData] = useState<PlayerData[]>([]);


	//TOO MANY REQUESTS, MAX 10 requests per minute
	// pick 10 competitions I like to pull at initial load, then just filter those requests through all my pages


	useEffect(() => {

    const key: string = import.meta.env.VITE_API_KEY;

    let europeStartDate: Date | string =  new Date();
    europeStartDate.setDate((europeStartDate.getDate() - (europeStartDate.getDay() + 3) % 7) -7);

    let europeEndDate: Date | string = new Date();
    europeEndDate.setMonth(europeStartDate.getMonth() + 2);

    europeStartDate = europeStartDate.toISOString().slice(0,10);
    europeEndDate = europeEndDate.toISOString().slice(0,10);

    const accessParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'X-Auth-Token': key
      }
    }

		const champMatchRequest = fetch(`/api/v4/competitions/CL/matches?dateFrom=${europeStartDate}&dateTo=${europeEndDate}`, accessParams).then(res => res.json());
		const champStandingsRequest = fetch(`/api/v4/competitions/CL/standings`, accessParams).then(res => res.json());
		const champScorersRequest = fetch(`/api/v4/competitions/CL/scorers?limit=20`, accessParams).then(res => res.json());

    Promise.all([champMatchRequest, champStandingsRequest, champScorersRequest])
    .then(([champMatchData, champStandingsData , champScorersData]) => {
			setCompetitionTitle(champMatchData.competition.name);
			setCompetitionBadge(champMatchData.competition.emblem);
      setChampMatchData(champMatchData.matches)
      setChampStandingsData(champStandingsData.standings[0].table)
      setChampScorersData(champScorersData.scorers)
    })
    .catch((err) => {
			console.log(err);
			navigate("/timeout", {state:{prevURL: window.location.href}});
		})

  }, [navigate])

	const groupedChampMatchData = getPrimedFixtureData(champMatchData);

	console.log("grouped Champions League Data", groupedChampMatchData);
	console.log("Champions League Standings", champStandingsData);
	//i want to sort by assists aswell (for later)
	console.log("Champions League Scorers ", champScorersData);

	return (
		<section className='section-body'>
			{groupedChampMatchData.length ? 
				<>
					<header className='header-img'>
						<img className="league-logo" src={competitionBadge} alt="HomeBadge" />
					</header>

					<section>
						<Carousel heading={competitionTitle} data={groupedChampMatchData} searchData={champMatchData} />

						<div className="all-tables-container"> 
							<StandingsTable tableData={champStandingsData} />

							<PlayerTable tableData={champScorersData} />
						</div>

						<p onClick={() => window.scroll({ top: 0, behavior: 'smooth' })} className='navigate'>Back to top</p>
						
					</section>
				</>
				:
				<h1>Loading...</h1>
			}
		</section>
	)
}

export default HomePage;