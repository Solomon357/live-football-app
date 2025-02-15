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

	useEffect(() => {

    let europeStartDate: Date | string =  new Date();
    europeStartDate.setDate((europeStartDate.getDate() - (europeStartDate.getDay() + 3) % 7) -7);

    let europeEndDate: Date | string = new Date();
    europeEndDate.setMonth(europeStartDate.getMonth() + 2);

    europeStartDate = europeStartDate.toISOString().slice(0,10);
    europeEndDate = europeEndDate.toISOString().slice(0,10);

		const champMatchRequest = fetch(`https://live-football-express.netlify.app/api/CL/matches?dateFrom=${europeStartDate}&dateTo=${europeEndDate}`).then(res => res.json());
		const champStandingsRequest = fetch(`https://live-football-express.netlify.app/api/CL/standings`).then(res => res.json());
		const champScorersRequest = fetch(`https://live-football-express.netlify.app/api/CL/scorers`).then(res => res.json());
		
		//console.log("data now on site!") //test

		Promise.all([champMatchRequest, champStandingsRequest, champScorersRequest])
		.then(([champMatchData, champStandingsData , champScorersData]) => {
			setCompetitionTitle(champMatchData.competition.name);
			setCompetitionBadge(champMatchData.competition.emblem);
			setChampMatchData(champMatchData.matches);
			setChampStandingsData(champStandingsData.standings[0].table);
			setChampScorersData(champScorersData.scorers);
		})
		.catch((err) => {
			console.log(err);
			navigate("/timeout", {state:{prevURL: window.location.href}});
		})

  }, [navigate])

	const ChampWeekData = getPrimedFixtureData(champMatchData);
	//console.log("non grouped champ data", champMatchData) // test

	//console.log("grouped Champions League Data", groupedChampMatchData); //test

	//console.log("Champions League Standings", champStandingsData); //test

	//console.log("Champions League Scorers ", champScorersData); //test

	return (
		<section className='section-body'>
			{ChampWeekData.length ? 
				<>
					<header className='header-img'>
						<img className="league-logo" src={competitionBadge} alt="HomeBadge" />
					</header>

					<section className='tables-container'>
						<Carousel heading={competitionTitle} data={ChampWeekData} searchData={champMatchData} />

						<div className="all-tables-container"> 
							<StandingsTable tableData={champStandingsData} />

							<PlayerTable tableData={champScorersData} />
						</div>

						<a href='#top' className='navigate'>Back to top</a>
						
					</section>
				</>
				:
				<h1>Loading...</h1>
			}
		</section>
	)
}

export default HomePage;