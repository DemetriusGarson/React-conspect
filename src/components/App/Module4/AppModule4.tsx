import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import Button from '../../Button/Button';
import type { ModuleOptions, Modules } from '../../types/Modules';
import {
  fetchPerson,
  fetchPersonTotalPages,
} from '../../../services/personService';
import PersonInfo2 from '../../PersonInfo2/PersonInfo2';
import { useState } from 'react';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Pagination from '../../Pagination/Pagination';

interface AppModule4Props {
  modules: Modules;
  visibilityHandler: (module: ModuleOptions) => void;
}
export default function AppModule4({
  modules,
  visibilityHandler,
}: AppModule4Props) {
  const [isShowPerson, setIsShowPerson] = useState<boolean>(false);
  const [personCount, setPersonCount] = useState<number>(1);

  // const {
  //   data: person,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ['person', personCount],
  //   queryFn: (context) => {
  //     console.log('Query Context:', context);
  //     return fetchPerson(personCount);
  //   },
  //   enabled: isShowPerson,
  //   placeholderData: keepPreviousData,
  // });

  // const { data, isSuccess: totalPagesIsSuccess } = useQuery({
  //   queryKey: ['personTotalPages'],
  //   queryFn: fetchPersonTotalPages,
  // });
  // const personTotalPages = data ? data.count : 0;

  const [
    {
      data: person,
      isLoading: isPersonLoading,
      isError: isPersonError,
      error: personError,
    },
    {
      data: { count: totalPages } = { count: 0 },
      isLoading: isTotalPagesLoading,
      isError: isTotalPagesError,
      error: totalPagesError,
      isSuccess: IsTotalPagesSuccess,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ['person', personCount],
        queryFn: () => fetchPerson(personCount),
        enabled: isShowPerson,
        placeholderData: keepPreviousData,
      },
      {
        queryKey: ['personTotalPages'],
        queryFn: fetchPersonTotalPages,
        enabled: isShowPerson,
        placeholderData: keepPreviousData,
      },
    ],
  });

  const handlePersonForm = (formData: FormData) => {
    const personNumber = formData.get('person_number') as string;
    if (Number(personNumber) < 1) return;
    setPersonCount(Number(personNumber));
  };

  return (
    <>
      {modules.module4 && (
        <>
          <h1>MODULE_4 React Query, Formik</h1>
          <div>
            <h2> Block: Use Query,Person</h2>
            <Button
              text={isShowPerson ? 'Hide Person' : 'Show Person'}
              variant={isShowPerson ? 'primary' : undefined}
              onClick={() => setIsShowPerson(!isShowPerson)}
            />
            {isShowPerson && (
              <div className="personBlock">
                <div className="personButtons">
                  <Button
                    text="<Prev Person"
                    onClick={() => {
                      if (personCount > 1) setPersonCount(personCount - 1);
                    }}
                  />
                  <Button
                    text="Next Person>"
                    onClick={() => setPersonCount(personCount + 1)}
                  />
                </div>
                <div className="personFrom">
                  <form action={handlePersonForm}>
                    <label htmlFor="person_number">Enter person number:</label>
                    <input
                      type="number"
                      id="person_number"
                      name="person_number"
                    />
                    <button type="submit">Enter</button>
                  </form>
                </div>
                <div>
                  {(isPersonLoading || isTotalPagesLoading) && <Loader />}
                  {isPersonError && <ErrorMessage err={personError} />}
                  {isTotalPagesError && <ErrorMessage err={totalPagesError} />}
                  {person && (
                    <div>
                      {IsTotalPagesSuccess && totalPages > 0 && (
                        <Pagination
                          totalPages={totalPages}
                          currentPage={personCount}
                          onPageChange={setPersonCount}
                        />
                      )}
                      <PersonInfo2 person={person} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button
            text={modules.module4 ? 'Hide module_4' : 'Show module4'}
            variant={modules.module4 ? 'primary' : undefined}
            onClick={() => visibilityHandler('module4')}
          />
        </>
      )}
    </>
  );
}
