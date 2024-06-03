// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetPromotions() {
  const URL = endpoints.promotion.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      promotions: data?.result || [],
      promotionsLoading: isLoading,
      promotionsError: error,
      promotionsValidating: isValidating,
      promotionsEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetPromotion(promotionId) {
  const URL = promotionId ? `${endpoints.promotion.detail}/${promotionId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      promotion: data?.result,
      promotionLoading: isLoading,
      promotionError: error,
      promotionValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createPromotion(eventData) {
  const URLcreate = endpoints.promotion.new;
  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('image', eventData.image);
  formData.append('description', eventData.description);
  formData.append('activate', eventData.activate);
  formData.append('amount', eventData.amount);
  formData.append('discount', eventData.discount);
  formData.append('point', eventData.point);
  formData.append('startTime', new Date(eventData.startTime).toISOString());
  formData.append('endTime', new Date(eventData.endTime).toISOString());

  await axios.post(URLcreate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updatePromotion(promotionId, eventData) {
  const URLupdate = promotionId ? `${endpoints.promotion.root}/${promotionId}` : '';

  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('icon', eventData.image);
  formData.append('description', eventData.description);
  formData.append('activate', eventData.activate);

  await axios.patch(URLupdate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deletePromotion(promotionId) {
  const URLdelete = promotionId ? `${endpoints.promotion.root}/${promotionId}` : '';
  const URLlist = endpoints.promotion.list;

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if (!currentData) return currentData;
    const newResult = currentData.result.filter((item) => item.id !== promotionId);
    return {
      ...currentData,
      result: newResult,
    };
  });
}
