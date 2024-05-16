// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetServices() {
  const URL = [endpoints.service.list, { params: { limit: 10000 } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      services: data?.result || [],
      servicesLoading: isLoading,
      servicesError: error,
      servicesValidating: isValidating,
      servicesEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetService(serviceId) {
  const URL = serviceId ? `${endpoints.service.detail}/${serviceId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      service: data?.result,
      serviceLoading: isLoading,
      serviceError: error,
      serviceValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createService(eventData) {
  const URLcreate = endpoints.service.new;
  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('icon', eventData.icon);
  formData.append('description', eventData.description);
  formData.append('activate', eventData.activate);
  await axios.post(URLcreate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateService(serviceId, eventData) {
  const URLupdate = serviceId ? `${endpoints.service.root}/${serviceId}` : '';

  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('icon', eventData.icon);
  formData.append('description', eventData.description);
  formData.append('activate', eventData.activate);

  await axios.patch(URLupdate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteService(serviceId) {
  const URLdelete = serviceId ? `${endpoints.service.root}/${serviceId}` : '';
  const URLlist = [endpoints.service.list, { params: { limit: 10000 } }];

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if (!currentData) return currentData;
    const newResult = currentData.result.filter((item) => item.id !== serviceId);
    const newMetadata = { ...currentData.metadata, total: newResult.length };
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  });
}
