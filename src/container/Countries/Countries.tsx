import {useEffect, useState} from 'react';
import {ApiCountries, ApiDetailsCountries} from '../../types';
import axios from 'axios';
import './Countries.css';
import Preloader from '../../components/Preloader/Preloader';
import CountriesList from '../../components/CountriesList/CountriesList';

const BASE_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const DETAILS_COUNTRIES_URL = (alphaCode: string) => `https://restcountries.com/v2/alpha/${alphaCode}`;

const Countries = () => {
  const [countries, setCountries] = useState<ApiCountries[]>([]);
  const [detailsCountries, setDetailsCountries] = useState<ApiDetailsCountries[]>([]);
  const [error, setError] = useState('');
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setPreloader(true);
        const response= await axios.get<ApiCountries[]>(BASE_URL);
        setPreloader(false);
        if (response.status !== 200) {
          throw new Error(`Запрос завершился с ошибкой статуса: ${response.status}`);
        }

        if (response.data.length > 0) {
          const countryData = response.data.map((country) => ({
            name: country.name,
            alpha3Code: country.alpha3Code,
          }));
          setCountries(countryData);
        }
      } catch (error) {
          setPreloader(false);
          console.error('К сожалению, не удалось выполнить запрос к API, попробуйте позже. ' + error);
      }
    };

    void dataFetch();
  }, []);


 const dataDetailsFetch = async (alphaCode: string) => {
   try {
     setPreloader(true);
     const response = await axios.get<ApiDetailsCountries[]>(DETAILS_COUNTRIES_URL(alphaCode));
     setPreloader(false);
     if (response.status !== 200) {
       throw new Error(`Запрос завершился с ошибкой статуса: ${response.status}`);
     }

     if (response.data.length > 0) {
       const countryDetailsData = response.data.map((countryDetails) => ({
         name: countryDetails.name,
         capital: countryDetails.capital,
         population: countryDetails.population,
         flag: countryDetails.flag,
         borders: countryDetails.borders,
       }));
       setDetailsCountries(countryDetailsData);
     }
   } catch (error) {
     setPreloader(false);
     console.error('К сожалению, не удалось выполнить запрос к API, попробуйте позже. ' + error);
   }
 };


  return (
    <>
      <Preloader preloader={preloader}/>
      <CountriesList countriesList={countries} onClickCountry={dataDetailsFetch}/>
    </>
  );
};

export default Countries;