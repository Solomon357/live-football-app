import "./Carousel.scss";
//import LemonBrand from '../../assets/scissor-brand-symbol.svg'
type CarouselPropTypes = {
  heading: string
}

const Carousel = ({ heading }: CarouselPropTypes) => {
  return (
    <div className="carousel-container">
      <h2>{heading} Matches</h2>
      <div className="card-container">
        

      </div>
    </div>
  )
}

export default Carousel;