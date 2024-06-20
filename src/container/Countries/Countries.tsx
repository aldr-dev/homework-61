import {useState} from 'react';
import {ApiCountries, ApiDetailsCountries} from '../../types';
import axios from 'axios';
import 'Countries.css';

const Countries = () => {
  const [countries, setCountries] = useState<ApiCountries[]>([]);
  const [detailsCountries, setDetailsCountries] = useState<ApiDetailsCountries[]>([]);
  const [error, setError] = useState('');
  const [preloader, setPreloader] = useState(false);


  return (
    <>

    </>
  );
};

export default Countries;