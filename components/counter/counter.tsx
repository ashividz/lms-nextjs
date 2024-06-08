"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

import CounterData from "@/data/counter.json";
import useCounterData from "@/hooks/use-counter-data";

import CounterHead from "./counter-head";

// Importing Odometer dynamically
const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <span>00</span>,
});

// TypeScript interface for Counter Data
interface CounterDataItem {
  img: string;
  text: string;
  top?: boolean;
}

// TypeScript interface for Counter Element
interface CounterElement {
  tag: string;
  title: string;
  subTitle: string;
  desc?: string;
  body: CounterDataItem[];
}

const Counter = ({ isDesc }: { isDesc: boolean }) => {
  // Using custom hook to fetch counter data
  const { values } = useCounterData(CounterData, "counterOne");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Creating A Community Of Life Long Learners
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-lg">
          <img
            src="/icons/learners-icon.png"
            alt="Learners Icon"
            className="w-24 h-24 mb-4"
          />
          <Counter initialValue={5000} />
          <p className="text-xl font-semibold mt-4">Learners & counting</p>
        </div>
        <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-lg">
          <img
            src="/icons/courses-icon.png"
            alt="Courses Icon"
            className="w-24 h-24 mb-4"
          />
          <Counter initialValue={8000} />
          <p className="text-xl font-semibold mt-4">Courses & Videos</p>
        </div>
        <div className="flex flex-col items-center bg-gray-200 p-6 rounded-lg shadow-lg">
          <img
            src="/icons/students-icon.png"
            alt="Students Icon"
            className="w-24 h-24 mb-4"
          />
          <Counter initialValue={1000} />
          <p className="text-xl font-semibold mt-4">Certified Students</p>
        </div>
      </div>
    </div>
  );
};

export default Counter;
