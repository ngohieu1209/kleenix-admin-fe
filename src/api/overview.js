import { useMemo } from 'react';
import useSWR from 'swr';

import { fetcher, endpoints } from 'src/utils/axios';

export function useGetOverview() {
  const URL = endpoints.overview.root;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      overview: data?.result,
      overviewLoading: isLoading,
      overviewError: error,
      overviewValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}
