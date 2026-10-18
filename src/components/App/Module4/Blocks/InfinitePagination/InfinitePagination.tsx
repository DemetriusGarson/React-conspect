import { useState } from 'react';
import Button from '../../../../Button/Button';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPersons } from '../../../../../services/personService';
import PersonsList from '../../../../PersonsList/PersonsList';

export default function InfinitePagination() {
  const [isPersonList, setIsPersonList] = useState<boolean>(false);

  const { data, isFetched, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['persons'],
    queryFn: ({ pageParam }) => {
      return fetchPersons({ page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastResponse) => {
      if (lastResponse.next === null) return undefined;
      const nextPageURL = new URL(lastResponse.next);
      const nextPage = Number(nextPageURL.searchParams.get('page'));
      return nextPage;
    },
    select: (data) => {
      return { ...data, persons: data.pages.flatMap((page) => page.results) };
    },
    enabled: isPersonList,
    placeholderData: keepPreviousData,
  });

  const persons = data?.persons ?? [];
  const hasPersons = persons.length > 0;

  if (isFetched) console.log(data);

  return (
    <>
      <div>
        <Button
          text={isPersonList ? 'Hide Person List' : 'Show Person List'}
          variant={isPersonList ? 'primary' : undefined}
          type="button"
          onClick={() => setIsPersonList(!isPersonList)}
        />
        {isPersonList && (
          <div>
            <h3>Person List</h3>
            {hasPersons && (
              <>
                <PersonsList persons={persons} />
                <Button
                  text={hasNextPage ? 'Load more Persons' : 'Nothing to Load'}
                  type="button"
                  variant={hasNextPage ? 'primary' : undefined}
                  disabled={!hasNextPage}
                  onClick={() => fetchNextPage()}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
