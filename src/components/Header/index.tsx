import { SetStateAction } from 'react';
import Filter from './Filter';
import SearchInput from './SearchInput';

type HeaderProps = {
  countrySearch: string;
  setRegion: React.Dispatch<SetStateAction<string>>;
};

const Header = ({ countrySearch, setRegion }: HeaderProps) => {
  return (
    <header>
      <SearchInput countrySearch={countrySearch} />
      <Filter setRegion={setRegion} />
    </header>
  );
};

export default Header;
