"use client";

import { useState, useEffect } from "react";

interface CounterDataItem {
  num: number;
}

interface CounterData {
  [key: string]: {
    body: CounterDataItem[];
  }[];
}

interface TimeoutIds {
  [key: string]: NodeJS.Timeout[];
}

const useFetch = (
  CounterData: CounterData,
  counterArr: string
): { values: number[] } => {
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (CounterData && CounterData[counterArr]) {
      const timeoutIds: TimeoutIds = {};

      CounterData[counterArr].forEach((data, index) => {
        timeoutIds[`timeoutIds_${index}`] = data.body.map(
          (item, innerIndex) => {
            return setTimeout(() => {
              setValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index * data.body.length + innerIndex] = item.num;
                return newValues;
              });
            }, innerIndex * 500);
          }
        );
      });

      return () => {
        Object.values(timeoutIds).forEach((innerTimeoutIds) =>
          innerTimeoutIds.forEach((id) => clearTimeout(id))
        );
      };
    }
  }, [counterArr, CounterData]);

  return { values };
};

export default useFetch;
