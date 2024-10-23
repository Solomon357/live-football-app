// import Carousel from "../components/Carousel/Carousel"
import HomeBadge from "../assets/homepage-badge.png";
import LeftArrow from "../assets/left-arrow.png";
import RightArrow from "../assets/right-arrow.png";
// import MatchWeekCard from "../components/MatchWeekCard/MatchWeekCard";
import { useState } from "react";

const HomePage = () => {
	const data = [1,2,3,4,5,6,7,8,9];
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
		<section>
			{data ? 
			<>
				<header className='header-img'>
					<img className="league-logo" src={HomeBadge} alt="HomeBadge" />
				</header>

				<section>
					<h2>European Competition Fixtures</h2>

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
					

					<input type="text" placeholder='search UEL teams...'/>
					<button >Search</button>

					{/* <Carousel heading="UEFA Europa League" /> */}
					<div className="carousel-container">
						<h2>Euro League</h2>
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

							<button className="carousel-container__rightbtn"onClick={handleIncrement}>
								<img src={RightArrow} alt="right-arrow" />
							</button>
						</div>

						<p> page {page} / {Math.ceil(data.length / 2)} </p>
					</div>


					<input type="text" placeholder='search CL teams...'/>
					<button >Search</button>

					{/* <Carousel heading="UEFA Conference League" /> */}
					<div className="carousel-container">
						<h2>Conf League</h2>
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

							<button className="carousel-container__rightbtn"onClick={handleIncrement}>
								<img src={RightArrow} alt="right-arrow" />
							</button>
						</div>

						<p> page {page} / {Math.ceil(data.length / 2)} </p>
					</div>
				</section>
				{/* <section>
					<h2>Fixtures in the Top Leagues</h2>

					<input type="text" placeholder='search PL teams...'/>
					<button>Search</button>
					
					<Carousel heading="Premier League"/>

					<input type="text" placeholder='search LaLiga teams...'/>
					<button>Search</button>

					<Carousel heading="La Liga"/>

					<input type="text" placeholder='search Bundesliga teams...'/>
					<button>Search</button>

					<Carousel heading="Bundesliga"/>

					<input type="text" placeholder='search Serie A teams...'/>
					<button>Search</button>

					<Carousel heading="Serie A"/>
					
					<input type="text" placeholder='search Ligue 1 teams...'/>
					<button>Search</button>

					<Carousel heading="Ligue 1"/>
					
					<input type="text" placeholder='search Eredivisie teams...'/>
					<button>Search</button>

					<Carousel heading="Eredivisie"/>

					<input type="text" placeholder='search Liga Portugal teams...'/>
					<button>Search</button>

					<Carousel heading="Primeira Liga"/>
				</section> */}

			</>
			:
			<p>Loading...</p>
			}
		</section>
	)
}

export default HomePage