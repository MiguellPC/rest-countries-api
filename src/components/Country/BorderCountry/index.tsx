type BorderCountryProps = {
  country: string;
};

const BorderCountry = ({ country }: BorderCountryProps) => {
  return (
    <li key={country} className="borderItem">
      {country}
    </li>
  );
};

export default BorderCountry;
