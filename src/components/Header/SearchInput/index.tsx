import { useEffect } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';

import './SearchInput.css';

type SearchInputProps = {
  countrySearch: string;
};

const SearchInput = ({ countrySearch }: SearchInputProps) => {
  const submit = useSubmit();

  useEffect(() => {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    searchInput.value = countrySearch;
  }, [countrySearch]);

  return (
    <Form className="search-input" id="search-form" role="search">
      <IonIcon icon={search} className="icon" />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for a country..."
        defaultValue={countrySearch}
        onChange={(e) => {
          submit(e.currentTarget.form, {
            replace: true,
          });
        }}
      />
    </Form>
  );
};

export default SearchInput;
