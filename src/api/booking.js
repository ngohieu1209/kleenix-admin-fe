// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetBookings() {
  const URL = endpoints.booking.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      bookings: data?.result || [],
      bookingsLoading: isLoading,
      bookingsError: error,
      bookingsValidating: isValidating,
      bookingsEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetBooking(bookingId) {
  const URL = bookingId ? `${endpoints.booking.detail}/${bookingId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      booking: data?.result,
      bookingLoading: isLoading,
      bookingError: error,
      bookingValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function updateStatus(bookingId, eventData) {
  const URLupdate = bookingId ? `${endpoints.booking.root}/${bookingId}` : '';

  console.log('winter-eventData', eventData);
}
