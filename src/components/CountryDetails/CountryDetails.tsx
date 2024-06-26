import {ApiDetailsCountries} from '../../types';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './CountryDetails.css';
import ErrorStatus from '../ErrorStatus/ErrorStatus';

interface Props {
  country: ApiDetailsCountries;
  url: (alphaCode: string) => string;
}

const CountryDetails: React.FC<Props> = ({country, url}) => {
  const [bordersCountries, setBordersCountries] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleError = (status: boolean) => {
    setError(status);
  };

  useEffect(() => {
    const borderCountryDetails = async () => {
      const borders: string[] = [];

      if (country.borders !== undefined && country.borders.length > 0) {
        try {
            const promises = country.borders.map(async (border) => {
            const response = await axios.get<ApiDetailsCountries>(url(border));

            if (response.status !== 200) {
              setError(true);
              throw new Error(`The request failed with an error: ${response.status}`);
            }
            return response.data;
          });

          const result = await Promise.all(promises);
          result.forEach((borderName) => {
            borders.push(borderName.name);
          });
          setBordersCountries(borders);
        } catch (error) {
          setError(true);
          console.error('ErrorStatus fetching border country details: ' + error);
        }
      }
    };

    void borderCountryDetails();
  }, [country, url]);

  return (
    <>
      <div className="country-details-inner">
        {country.name ? (
          <>
            <div className="country-row-info">
              <div className="country-col">
                <h1 className="country-title">{country.name}</h1>
                <span className="country-info"><b>{country.capital ? 'Capital:': ''}</b> {country.capital ? country.capital : 'Capital: no capital'}</span>
                <span className="country-info"><b>{country.population ? 'Population:': ''}</b> {country.population ? country.population : 'Population: no population'}</span>
              </div>
              <div className="country-col">
                {country.flag ? (
                  <img className="country-flag" src={country.flag} alt={country.name}/>
                ): null}
              </div>
            </div>
            <strong>{country.borders !== undefined ? 'Borders with:': ''}</strong>
            {country.borders !== undefined ? (
              <ul className="border-countries">
                {bordersCountries.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            ): (<p>This country has no neighboring bordering countries.</p>)}
          </>
        ): (<p>Please select a country for information.</p>)}

       <ErrorStatus error={error} handleError={handleError}>Error fetching border country details</ErrorStatus>
      </div>
    </>
  );
};

export default CountryDetails;