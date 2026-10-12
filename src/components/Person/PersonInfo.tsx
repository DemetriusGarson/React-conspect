import { useEffect, useState } from 'react';
import type { Person } from '../types/Person';
import axios from 'axios';

interface PersonProps {
  person: Person;
}

type PersonData = [string, string | string[]];

export default function PersonInfo({ person }: PersonProps) {
  const [personData, setPersonData] = useState<PersonData[] | null>(null);

  useEffect(() => {
    const builder = async () => {
      const personEntries = Object.entries(person) as PersonData[];
      const personArray = await Promise.all(
        personEntries.map(async ([key, value]) => {
          if (
            key !== 'url' &&
            typeof value === 'string' &&
            value.startsWith('https://swapi.info/api/')
          ) {
            const response = await axios.get(value);
            const resultValue = response.data.title || response.data.name;
            return [key, resultValue] as PersonData;
          }
          if (Array.isArray(value)) {
            const arrayValue = await Promise.all(
              value.map(async (valueItem) => {
                if (valueItem.startsWith('https://swapi.info/api/')) {
                  const response = await axios.get(valueItem);

                  return response.data.title || response.data.name;
                }
                return valueItem;
              }),
            );
            return [key, arrayValue] as PersonData;
          }
          return [key, value] as PersonData;
        }),
      );
      setPersonData(personArray);
    };
    builder();
  }, [person]);

  return (
    <>
      {' '}
      {personData && (
        <>
          <h1>{person.name}</h1>
          <ul>
            {personData.map(([key, value], index) => {
              return (
                <li key={`${key}-${index}`}>
                  {!Array.isArray(value) ? (
                    <p>{`${key}: ${value}`}</p>
                  ) : (
                    <>
                      <p>{key}:</p>
                      <ul>
                        {value.map((valueItem, index) => {
                          return (
                            <li key={`${valueItem}-${index}`}>
                              <p>{valueItem}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
