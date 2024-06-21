import {useEffect, useState} from 'react';
import {ApiCountries, ApiDetailsCountries} from '../../types';
import axios from 'axios';
import './Countries.css';
import Preloader from '../../components/Preloader/Preloader';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountryDetails from '../../components/CountryDetails/CountryDetails';

const BASE_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const DETAILS_COUNTRIES_URL = (alphaCode: string) => `https://restcountries.com/v2/alpha/${alphaCode}`;

const Countries = () => {
  const [countries, setCountries] = useState<ApiCountries[]>([]);
  const [detailsCountries, setDetailsCountries] = useState<ApiDetailsCountries>({
    name: '',
    capital: '',
    population: '',
    flag: '',
    borders: [],
  });
  const [error, setError] = useState(false);
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
     const response = await axios.get<ApiDetailsCountries>(DETAILS_COUNTRIES_URL(alphaCode));
     setPreloader(false);
     if (response.status !== 200) {
       throw new Error(`Запрос завершился с ошибкой статуса: ${response.status}`);
     }

     if (response.data !== undefined) {
       setDetailsCountries((prevState) => {
         return {
           ...prevState,
           name: response.data.name,
           capital: response.data.capital,
           population: response.data.population,
           flag: response.data.flag,
           borders: response.data.borders,
         };
       });

     }
   } catch (error) {
     setPreloader(false);
     console.error('К сожалению, не удалось выполнить запрос к API, попробуйте позже. ' + error);
   }
 };


  return (
    <>
      <Preloader preloader={preloader}/>
      <div className="columns">
        <CountriesList countriesList={countries} onClickCountry={dataDetailsFetch}/>
        <CountryDetails url={DETAILS_COUNTRIES_URL} country={detailsCountries}/>
      </div>
    </>
  );
};

export default Countries;