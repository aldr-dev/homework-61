import React from 'react';
import {ApiCountries} from '../../types';
import './CountriesList.css';

interface Props {
  countriesList: ApiCountries[];
}

const CountriesList: React.FC<Props> = ({countriesList}) => {
  return (
    <div className="countries">
      <ul className="countries-list">
        {countriesList.map((country) => (
          <li key={country.name} className="countries-item">{country.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;