import { useEffect, useRef, useState } from 'react';
import css from './InfinitePaginationSelect.module.css';
import SelectList from '../../../../SelectList/SelectList';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPersons } from '../../../../../services/personService';
import type { Person } from '../../../../types/Person';

export default function InfinitePaginationSelect() {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);
  const observerRootRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['persons'],
    queryFn: ({ pageParam }) => fetchPersons({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastResponse) => {
      if (lastResponse.next === null) return undefined;
      const nextPageUrl = new URL(lastResponse.next);
      const nextPage = nextPageUrl.searchParams.get('page');
      return Number(nextPage);
    },
    select: (data) => {
      return {
        ...data,
        persons: data.pages.flatMap((page) => page.results),
      };
    },
    enabled: isSelectOpen,
    placeholderData: keepPreviousData,
  });

  const persons = data?.persons || [];

  const handlePersonSelect = (person: Person) => {
    if (!person) return;
    setSelectedPerson(person);
    setIsSelectOpen(false);
  };

  useEffect(() => {
    const target = targetRef.current;
    const observerRoot = observerRootRef.current;

    if (!target || !observerRoot || isFetching || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === target && entry.isIntersecting) fetchNextPage();
        });
      },
      {
        root: observerRoot,
        rootMargin: '0px 0px 100px 0px',
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isSelectOpen, fetchNextPage, isFetching, hasNextPage]);

  return (
    <>
      <h3>Infinite Select</h3>
      <div className={css.container}>
        <p
          className={css.selectText}
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          {selectedPerson ? selectedPerson.name : 'Select Person'}
        </p>
        {isSelectOpen && (
          <div ref={observerRootRef} className={css.listContainer}>
            <SelectList items={persons} onSelect={handlePersonSelect} />
            <div ref={targetRef} className="observerTarget"></div>
          </div>
        )}
      </div>
    </>
  );
}
