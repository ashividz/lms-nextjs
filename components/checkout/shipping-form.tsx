"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { shippingSchema } from "@/schemas";
import { useEffect, useState } from "react";
import { City, Country, State } from "@/types/country-state-city";
import { useUserCountry } from "@/context/user-country-context";

const ShippingForm = () => {
  const { userCountry } = useUserCountry();
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [countriesFetched, setCountriesFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/countries");
        const countries = response.data;
        setCountries(countries);
        setCountriesFetched(true);
      } catch (error: any) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countriesFetched) {
      getCurrentCountry();
    }
  });

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry.id);
    }
  }, [selectedCountry]);

  const getCurrentCountry = async () => {
    try {
      const selectedCountry = countries.filter(
        (country) => country.countryCode === userCountry
      )[0];
      setSelectedCountry(
        selectedCountry !== undefined ? selectedCountry : null
      );
    } catch (error) {
      console.error("Error fetching current country:", error);
    }
  };
  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    fetchStates(country.id);
  };

  const fetchStates = async (countryId: number) => {
    try {
      const response = await axios.get(`/api/states?countryId=${countryId}`);
      const statesData = response.data;
      setStates(statesData);
    } catch (error: any) {
      throw new Error("Error fetching states:", error);
    }
  };
  const fetchCities = async (stateId: number) => {
    try {
      const response = await axios.get(`/api/cities?stateId=${stateId}`);
      const citiesData = response.data;
      setCities(citiesData);
    } catch (error: any) {
      throw new Error("Error fetching cities:", error);
    }
  };
  const handleStateChange = (state: State) => {
    setSelectedState(state);
    fetchCities(state.id);
    setSelectedCity(null);
  };

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
  };

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof shippingSchema>) => {
    try {
      const response = await axios.post("/api/checkout", values);
    } catch {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col items-start bg-white rounded-md p-4 shadow-sm transition justify-start">
      <h1 className="text-2xl font-bold">Shipping Address</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 w-full"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="First Name"
                      {...field}
                      className="w-full h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Last Name"
                      {...field}
                      className="w-full h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Email"
                      {...field}
                      className="w-full h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Phone Number"
                      {...field}
                      className="w-full h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      {...field}
                      placeholder="e.g. 'House number, street name'"
                      className="w-full h-32 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const selectedCountry = countries.find(
                          (c) => c.countryCode === value
                        ) as Country;
                        handleCountryChange(selectedCountry);
                      }}
                      value={selectedCountry ? selectedCountry.countryCode : ""}
                    >
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country: Country) => {
                          return (
                            <SelectItem
                              key={country.countryCode}
                              value={country.countryCode}
                            >
                              {country.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const selectedState = states.find(
                          (s) => s.name === value
                        ) as State;
                        handleStateChange(selectedState);
                      }}
                      value={selectedState ? selectedState.name : ""}
                      disabled={!selectedCountry}
                    >
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state: State) => {
                          return (
                            <SelectItem key={state.id} value={state.name}>
                              {state.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        const selectedCity = cities.find(
                          (city) => city.name === value
                        ) as City;
                        handleCityChange(selectedCity);
                      }}
                      value={selectedCity ? selectedCity.name : ""}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city: City) => {
                          return (
                            <SelectItem key={city.id} value={city.name}>
                              {city.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Zip"
                      {...field}
                      className="w-full h-12 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingForm;
