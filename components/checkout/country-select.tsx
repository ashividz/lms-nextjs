"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country } from "@/types/country-state-city";

import { MouseEventHandler, useEffect, useState } from "react";

interface CountrySelectProps {
  value: Country | null;
  onChange: (value: Country) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/countries");
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
        } else {
          throw new Error("Failed to fetch countries");
        }
      } catch (error) {
        throw new Error("Error fetching countries:");
      }
    };
    fetchData();
  }, []);
  const handleChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log("handle chage triggered");
    // hum yahan se country ko identify karenge aur onChange callback ko trigger karenge
    const countryCode = event.currentTarget.value;
    const selectedCountry = countries.find(
      (country) => country.countryCode === countryCode
    );
    if (selectedCountry) {
      // hum yahan se country ko identify karenge
      console.log(selectedCountry);
      onChange(selectedCountry);
    }
  };

  return (
    <Select value={value?.countryCode}>
      <SelectTrigger className="w-full" onChange={handleChange}>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(countries).map(([region, countriesInRegion]) => {
          const regionCountries = Array.isArray(countriesInRegion)
            ? countriesInRegion
            : [countriesInRegion];
          return (
            <SelectGroup key={region}>
              <SelectLabel className="text-heading font-bold ">
                {region}
              </SelectLabel>

              {regionCountries.map((country: Country) => (
                <SelectItem
                  key={country.countryCode}
                  value={country.countryCode}
                >
                  {country.name}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
