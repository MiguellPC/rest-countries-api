import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getAllCountries } from '../../services/API';
import BackToTopButton from './BackToTopButton';
import Header from '../Header';
import Card from './Card';

import './MainSection.css';

export type CountryType = {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
  cca3: string;
};

type loaderProps = {
  request: Request;
};

type loaderDataType = {
  countriesData: CountryType[];
  search: string;
};

export async function loader({ request }: loaderProps) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const countriesData = await getAllCountries();
  return { countriesData, search };
}

const MainSection = () => {
  const { countriesData, search } = useLoaderData() as loaderDataType;
  const [data, setData] = useState<CountryType[]>();
  const [region, setRegion] = useState<string>('');

  useEffect(() => {
    if (!data) {
      setData([...countriesData]);
    }
  }, [data, countriesData, region]);

  return (
    <main>
      {data ? (
        <>
          <BackToTopButton />
          <Header countrySearch={search} setRegion={setRegion} />
          <section className="cards">
            {search
              ? data
                  .filter((country) =>
                    country.name.common
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  )
                  .filter((country) =>
                    region === 'All' || region === ''
                      ? country
                      : country.region === region,
                  )
                  .map((country, index: number) => (
                    <Card key={index} info={country} />
                  ))
              : data
                  .filter((country) =>
                    region === 'All' || region === ''
                      ? country
                      : country.region === region,
                  )
                  .map((country, index: number) => (
                    <Card key={index} info={country} />
                  ))}
          </section>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default MainSection;
