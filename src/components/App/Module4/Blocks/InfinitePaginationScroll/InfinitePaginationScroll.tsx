import { useEffect, useState } from 'react';
import Button from '../../../../Button/Button';
import PersonsList from '../../../../PersonsList/PersonsList';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPersons } from '../../../../../services/personService';
import ErrorMessage from '../../../../ErrorMessage/ErrorMessage';

export default function InfinitePaginationScroll() {
  const [isPersonListScroll, setIsPersonListScroll] = useState<boolean>(false);
  const [observerTarget, setObserverTarget] = useState<HTMLDivElement | null>(
    null,
  );

  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['persons'],
    queryFn: (context) => {
      return fetchPersons({ page: context.pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastResponse) => {
      if (lastResponse.next === null) return undefined;
      const nextPageUrl = new URL(lastResponse.next);
      const nextPage = Number(nextPageUrl.searchParams.get('page'));
      return nextPage;
    },
    select: (data) => {
      return { ...data, persons: data.pages.flatMap((page) => page.results) };
    },
    enabled: isPersonListScroll,
    placeholderData: keepPreviousData,
  });

  const persons = data?.persons ?? [];
  const hasPersons = persons.length > 0;

  useEffect(() => {
    if (!observerTarget) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target !== observerTarget) return;
        if (!entry.isIntersecting) return;
        if (!hasNextPage || isFetching) return;
        fetchNextPage();
      });
    });

    observer.observe(observerTarget);

    return () => observer.disconnect();
  }, [observerTarget, hasNextPage, isFetching, fetchNextPage]);

  return (
    <div>
      <Button
        text={
          isPersonListScroll ? 'Hide PersonListScroll' : 'Show PersonListScroll'
        }
        variant={isPersonListScroll ? 'primary' : undefined}
        type="button"
        onClick={() => setIsPersonListScroll(!isPersonListScroll)}
      />
      {isPersonListScroll && (
        <div>
          <h3>Person List with infinite Scroll</h3>
          {isError && <ErrorMessage err={error} />}
          {hasPersons && <PersonsList persons={persons} />}
          {isFetchingNextPage && <p>Loading next page...</p>}

          {hasNextPage && (
            <div ref={setObserverTarget} className="observerTarget"></div>
          )}
        </div>
      )}
    </div>
  );
}
