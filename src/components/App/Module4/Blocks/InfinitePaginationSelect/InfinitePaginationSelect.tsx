import { useEffect, useRef, useState } from 'react';
import css from './InfinitePaginationSelect.module.css';
import SelectList from '../../../../SelectList/SelectList';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPersons } from '../../../../../services/personService';
import type { Person } from '../../../../types/Person';
import clsx from 'clsx';
import PersonInfo2 from '../../../../PersonInfo2/PersonInfo2';

export default function InfinitePaginationSelect() {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);
  const observerRootRef = useRef<HTMLDivElement>(null);
  const selectContainerRef = useRef<HTMLDivElement>(null);

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

  const handlePersonSelect = (person: Person | null) => {
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

    return () => {
      observer.disconnect();
    };
  }, [isSelectOpen, fetchNextPage, isFetching, hasNextPage]);

  useEffect(() => {
    if (!isSelectOpen) return;

    function handleSideClose(event: PointerEvent) {
      if (!selectContainerRef.current?.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    }

    document.addEventListener('click', handleSideClose);

    return () => {
      document.removeEventListener('click', handleSideClose);
    };
  }, [isSelectOpen]);

  return (
    <>
      <h3>Infinite Select</h3>
      <div ref={selectContainerRef} className={css.container}>
        <div
          className={css.selectTextContainer}
          onClick={() => setIsSelectOpen((prev) => !prev)}
        >
          <p className={css.selectText}>
            {selectedPerson ? selectedPerson.name : 'Select Person'}
          </p>
          <span className={clsx(css.selectChevron, isSelectOpen && css.open)}>
            ▾
          </span>
        </div>
        {isSelectOpen && (
          <div ref={observerRootRef} className={css.listContainer}>
            <SelectList items={persons} onSelect={handlePersonSelect} />
            <div ref={targetRef} className="observerTarget"></div>
          </div>
        )}
      </div>
      {selectedPerson && <PersonInfo2 person={selectedPerson} />}
    </>
  );
}
