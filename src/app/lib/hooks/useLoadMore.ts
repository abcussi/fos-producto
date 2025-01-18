import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LOAD_MORE_THRESHOLD = 0.8;

export const useLoadMore = (totalItems: number, itemsPerPage: number) => {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: LOAD_MORE_THRESHOLD,
  });

  useEffect(() => {
    if (inView && page * itemsPerPage < totalItems) {
      setPage((prev) => prev + 1);
    }
  }, [inView, totalItems, page, itemsPerPage]);

  return { page, loadMoreRef: ref };
};

export default useLoadMore;