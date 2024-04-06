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

import { useEffect, useState } from "react";

interface CountrySelectProps {
  value: Country | null;
  onChange: (value: Country) => void;
}

export function StateSelect({ value, onChange }: CountrySelectProps) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/countries");
        if (response.ok) {
          const data = await response.json();
          setCountries(data);
          console.log("Countries fetched successfully:", data);
        } else {
          console.error("Error fetching countries:", response);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(countries).map(([region, countriesInRegion]) => {
          const regionCountries = countriesInRegion as Country[];

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
