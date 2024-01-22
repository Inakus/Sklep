import { useState } from "react";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import plLocale from "i18n-iso-countries/langs/pl.json";

export default function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value: string) => setSelectedCountry(value);

  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(plLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <div>
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedCountry}
        onChange={(e) => selectCountryHandler(e.target.value)}
      >
        {!!countryArr?.length &&
          countryArr.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </select>
    </div>
  );
}
