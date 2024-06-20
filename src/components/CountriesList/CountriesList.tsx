import React from 'react';
import {ApiCountries} from '../../types';
import './CountriesList.css';

interface Props {
  countriesList: ApiCountries[];
  onClickCountry: (alphaCode: string) => void;
}

const CountriesList: React.FC<Props> = ({countriesList, onClickCountry}) => {
  return (
    <div className="countries">
      <ul className="countries-list">
        {countriesList.map((country) => (
          <li
            key={country.name}
            onClick={() => onClickCountry(country.alpha3Code)}
            className="countries-item">{country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;