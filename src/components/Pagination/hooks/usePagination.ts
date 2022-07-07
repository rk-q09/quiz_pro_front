import { useState, useEffect } from 'react';

import { QuizCount } from '@/features/quiz/types';

type usePaginationProps<TGetCountKey> = {
  getCountKey?: TGetCountKey;
  getCountWithKeyFn?: (fnKey: TGetCountKey) => Promise<QuizCount>;
  getCountFn?: () => Promise<QuizCount>;
}

export const usePagination = <TGetCountKey = null>({ 
  getCountKey, getCountWithKeyFn, getCountFn 
}: usePaginationProps<TGetCountKey>) => {
  const [page, setPage] = useState(1);
  const [sum ,setSum] = useState(0);

  const perPage = 16;

  useEffect(() => {
    const setCount = async () => {
      if (getCountKey && getCountWithKeyFn) {
        const res = await getCountWithKeyFn(getCountKey);
        setSum(res.count);
      } else if (getCountFn) {
        const res = await getCountFn();
        setSum(res.count);
      }
    };
    setCount();
  }, []);

  return {
    page,
    perPage,
    sum,
    setPage
  };
} 
