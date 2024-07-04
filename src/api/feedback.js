// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR from 'swr';

import { fetcher, endpoints } from 'src/utils/axios';

export function useGetFeedbacks() {
  const URL = endpoints.feedback.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      feedbacks: data?.result || [],
      feedbacksLoading: isLoading,
      feedbacksError: error,
      feedbacksValidating: isValidating,
      feedbacksEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetFeedback(feedbackId) {
  const URL = feedbackId ? `${endpoints.feedback.detail}/${feedbackId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      feedback: data?.result,
      feedbackLoading: isLoading,
      feedbackError: error,
      feedbackValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}
