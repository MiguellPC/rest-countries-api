import { Dispatch, SetStateAction } from 'react';
import './Filter.css';

type FilterProps = {
  setRegion: Dispatch<SetStateAction<string>>;
};

const Filter = ({ setRegion }: FilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRegion(value);
  };

  return (
    <div className="select-dropdown">
      <select name="filterRegion" defaultValue={''} onChange={handleChange}>
        <option value="" disabled>
          Filter by Region
        </option>
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Filter;
