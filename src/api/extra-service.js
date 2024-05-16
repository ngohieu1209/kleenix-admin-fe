// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetExtraServices() {
  const URL = [endpoints.extraService.list, { params: { limit: 10000 } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      extraServices: data?.result || [],
      extraServicesLoading: isLoading,
      extraServicesError: error,
      extraServicesValidating: isValidating,
      extraServicesEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetExtraService(extraServiceId) {
  const URL = extraServiceId ? `${endpoints.extraService.detail}/${extraServiceId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      extraService: data?.result,
      extraServiceLoading: isLoading,
      extraServiceError: error,
      extraServiceValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createExtraService(eventData) {
  const URLcreate = endpoints.extraService.new;
  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('icon', eventData.icon);
  formData.append('description', eventData.description);
  formData.append('activate', eventData.activate);
  formData.append('price', eventData.price);
  formData.append('duration', eventData.duration);

  await axios.post(URLcreate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateExtraService(extraServiceId, eventData) {
  const URLupdate = extraServiceId ? `${endpoints.extraService.root}/${extraServiceId}` : '';

  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('icon', eventData.icon);
  formData.append('description', eventData.description);
  formData.append('activate', eventData.activate);
  formData.append('price', eventData.price);
  formData.append('duration', eventData.duration);

  await axios.patch(URLupdate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteExtraService(extraServiceId) {
  const URLdelete = extraServiceId ? `${endpoints.extraService.root}/${extraServiceId}` : '';
  const URLlist = [endpoints.extraService.list, { params: { limit: 10000 } }];

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if (!currentData) return currentData;
    const newResult = currentData.result.filter((item) => item.id !== extraServiceId);
    const newMetadata = { ...currentData.metadata, total: newResult.length };
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  });
}
