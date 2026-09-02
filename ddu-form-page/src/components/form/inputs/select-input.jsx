import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ErrorMessage } from "../../../styles/global-styles.jsx";
import { InputHolder } from "./labeled-input-styles.jsx";
import { forwardRef } from "react";

export const allowedCountries = [
  { code: "pl", name: "Poland", maxLength: 9 },
  { code: "us", name: "USA", maxLength: 10 },
  { code: "de", name: "Germany", maxLength: 11 },
  { code: "gb", name: "United Kingdom", maxLength: 10 },
  { code: "fr", name: "France", maxLength: 9 },
  { code: "it", name: "Italy", maxLength: 10 },
  { code: "es", name: "Spain", maxLength: 9 },
  { code: "nl", name: "Netherlands", maxLength: 9 },
  { code: "be", name: "Belgium", maxLength: 9 },
  { code: "at", name: "Austria", maxLength: 11 },
  { code: "ch", name: "Switzerland", maxLength: 9 },
  { code: "ie", name: "Ireland", maxLength: 9 },
  { code: "pt", name: "Portugal", maxLength: 9 },
  { code: "cz", name: "Czech Republic", maxLength: 9 },
  { code: "sk", name: "Slovakia", maxLength: 9 },
  { code: "hu", name: "Hungary", maxLength: 9 },
  { code: "ro", name: "Romania", maxLength: 9 },
  { code: "bg", name: "Bulgaria", maxLength: 9 },
  { code: "gr", name: "Greece", maxLength: 10 },
  { code: "hr", name: "Croatia", maxLength: 9 },
  { code: "si", name: "Slovenia", maxLength: 8 },
  { code: "lt", name: "Lithuania", maxLength: 8 },
  { code: "lv", name: "Latvia", maxLength: 8 },
  { code: "ee", name: "Estonia", maxLength: 8 },
  { code: "ua", name: "Ukraine", maxLength: 9 },
  { code: "se", name: "Sweden", maxLength: 9 },
  { code: "no", name: "Norway", maxLength: 8 },
  { code: "dk", name: "Denmark", maxLength: 8 },
  { code: "fi", name: "Finland", maxLength: 9 },
  { code: "is", name: "Iceland", maxLength: 7 },
];

const PhoneField = forwardRef(({ form, ...props }, ref) => {
  const handleChange = (value, country) => {
    const selectedCountry = allowedCountries.find(c => c.code === country.countryCode);
    form.setFieldValue("phone", value);
    form.setFieldValue("phoneCountry", selectedCountry?.code || country.countryCode);
  };

  return (
    <InputHolder ref={ref}>
      <label>Contact Phone Number</label>
      <PhoneInput
        country="pl"
        onlyCountries={allowedCountries.map(c => c.code)}
        value={form.values.phone}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched("phone", true)}
        inputProps={{
          name: "phone",
          required: true,
        }}
        enableSearch={true}
        disableSearchIcon={false}
        dropdownStyle={{ zIndex: 9999 }}
        {...props}
      />
      {form.touched.phone && form.errors.phone && (
        <ErrorMessage>{form.errors.phone}</ErrorMessage>
      )}
    </InputHolder>
  );
});

export default PhoneField;
