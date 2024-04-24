import { Params, useLoaderData, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../../services/API';
import { useEffect } from 'react';
import countryCodes from '../../utils/countriesCodes.json';
import BorderCountry from './BorderCountry';
import { IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

import './country.css';

type loaderProps = {
  params: Params;
};

export type FullCountryDataType = {
  name: {
    common: string;
    nativeName: {
      [key: string]: { common: string };
    };
  };
  population: number;
  region: string;
  capital: string;
  flags: { svg: string };
  tld: string;
  currencies: {
    [key: string]: { name: string; symbol: string };
  };
  languages: { [key: string]: string };
  borders: string[];
};

export async function loader({
  params,
}: loaderProps): Promise<FullCountryDataType> {
  const country = await getCountryByCode(params.code!);

  if (!country) {
    throw new Response('', {
      status: 404,
      statusText: 'Country not found',
    });
  }

  return country;
}

const Country = () => {
  const navigate = useNavigate();
  const country = useLoaderData() as FullCountryDataType;

  const regex = /(\d)(?=(\d{3})+(?!\d))/g;
  const population = country.population.toString().replace(regex, '$1,');

  useEffect(() => {
    document.title = country.name.common;

    return () => {
      document.title = 'Where in the world?';
    };
  }, [country]);

  return (
    <main className="countryInfo">
      <section className="backButton">
        <button type="button" onClick={() => navigate(-1)}>
          <IonIcon icon={arrowBack} />
          <p>Back</p>
        </button>
      </section>
      <section className="infoSection">
        <div className="flag">
          <img src={country.flags.svg} alt="flag" />
        </div>
        <section className="dataSection">
          <h1>{country.name.common}</h1>
          <div className="data">
            <div>
              <p>
                <strong>Native Name:</strong>{' '}
                {Object.values(country.name.nativeName)[0].common}
              </p>
              <p>
                <strong>Population:</strong> {population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong> {country.tld}
              </p>
              <p>
                <strong>Currencies:</strong>{' '}
                {Object.values(country.currencies)
                  .map((currency) => `${currency.name} ( ${currency.symbol} )`)
                  .join(', ')}
              </p>
              <p>
                <strong>Languages:</strong>{' '}
                {Object.values(country.languages)
                  .map((lang) => lang)
                  .join(', ')}
              </p>
            </div>
          </div>
          <div className="borders">
            <h2>Border Countries:</h2>
            <ul>
              {country.borders
                ? country.borders.map((border) => (
                    <BorderCountry
                      country={
                        countryCodes[border as keyof typeof countryCodes]
                      }
                    />
                  ))
                : 'No borders'}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Country;
