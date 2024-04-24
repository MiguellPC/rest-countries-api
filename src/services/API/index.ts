import { FullCountryDataType } from '../../components/Country';
import { CountryType } from '../../components/MainSection';

const URL = 'https://restcountries.com/v3.1';

// cache data
let cache: CountryType[] = [];

// update cache every week
setInterval(() => {
  cache = [];
}, 604800);

const fetchCountries = async (): Promise<CountryType[]> => {
  const countriesData = await fetch(
    `${URL}/all?fields=name,population,region,capital,flags,cca3`,
    { cache: 'force-cache' },
  );
  const countries = await countriesData.json();
  return [...countries];
};

export async function getAllCountries() {
  if (cache.length === 0) {
    cache = await fetchCountries();
  }
  return cache;
}

export async function getCountryByCode(
  code: string,
): Promise<FullCountryDataType> {
  const countryData = await fetch(`${URL}/alpha/${code}`);
  const country = await countryData.json();
  return country[0];
}
