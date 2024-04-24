import './Card.css';
import { CountryType } from '..';
import { Link } from 'react-router-dom';

type CardProps = {
  info: CountryType;
};
const Card = ({ info }: CardProps) => {
  const regex = /(\d)(?=(\d{3})+(?!\d))/g;
  const population = info.population.toString().replace(regex, '$1,');

  return (
    <div className="card">
      <Link to={`/country/${info.cca3}`}>
        <img src={info.flags.png} />
        <div className="info">
          <h3>{info.name.common}</h3>
          <p>Population: {population}</p>
          <p>Region: {info.region}</p>
          {info.capital && <p>Capital: {info.capital[0]}</p>}
        </div>
      </Link>
    </div>
  );
};

export default Card;
