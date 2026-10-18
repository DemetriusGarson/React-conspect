import { useState } from 'react';
import Button from '../Button/Button';
import type { Person } from '../types/Person';
import PersonInfo2 from '../PersonInfo2/PersonInfo2';

interface PersonsListProps {
  persons: Person[];
}
export default function PersonsList({ persons }: PersonsListProps) {
  const [isPersonsVisible, setIsPersonsVisible] = useState<
    Record<string, boolean>
  >({});

  const toggleVisibility = (name: string) => {
    setIsPersonsVisible((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          <h4>{person.name}</h4>
          <Button
            text={
              isPersonsVisible[person.name]
                ? `Hide ${person.name}`
                : `Show ${person.name}`
            }
            variant={isPersonsVisible[person.name] ? 'primary' : undefined}
            onClick={() => toggleVisibility(person.name)}
          />
          {isPersonsVisible[person.name] && <PersonInfo2 person={person} />}
        </li>
      ))}
    </ul>
  );
}
