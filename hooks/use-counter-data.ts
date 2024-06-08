"use client";

import { useState, useEffect } from "react";

// Define the custom hook for data fetching
const useCounterData = (counterData: any, counterArr: string) => {
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (counterData && counterData[counterArr]) {
        const timeouts = counterData[counterArr].map(
          (data: any, index: number) => {
            return data.body.map((item: any, innerIndex: number) => {
              return setTimeout(() => {
                setValues((prevValues) => {
                  const newValues = [...prevValues];
                  newValues[index * data.body.length + innerIndex] = item.num;
                  return newValues;
                });
              }, innerIndex * 500);
            });
          }
        );

        return () => {
          timeouts.forEach((timeoutArray: NodeJS.Timeout[]) =>
            timeoutArray.forEach((id: NodeJS.Timeout) => clearTimeout(id))
          );
        };
      }
    };

    fetchData();

    // Cleanup function
    return () => {};
  }, [counterData, counterArr]);

  return { values };
};

export default useCounterData;
