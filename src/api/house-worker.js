// import _ from 'lodash';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher, endpoints } from 'src/utils/axios';

export function useGetHouseWorkers() {
  const URL = [endpoints.houseWorker.list, { params: { limit: 10000 } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      houseWorkers: data?.result || [],
      houseWorkersLoading: isLoading,
      houseWorkersError: error,
      houseWorkersValidating: isValidating,
      houseWorkersEmpty: !isLoading && !data?.result.length,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetHouseWorker(houseWorkerId) {
  const URL = houseWorkerId ? `${endpoints.houseWorker.detail}/${houseWorkerId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      houseWorker: data?.result,
      houseWorkerLoading: isLoading,
      houseWorkerError: error,
      houseWorkerValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetListAssignment(houseWorkerId) {
  const URL = houseWorkerId ? `${endpoints.houseWorker.assignment}/${houseWorkerId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      assignments: data?.result || [],
      assignmentsLoading: isLoading,
      assignmentsError: error,
      assignmentsValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createHouseWorker(eventData) {
  const URLcreate = endpoints.houseWorker.new;
  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('avatar', eventData.avatar);
  formData.append('username', eventData.username);
  formData.append('password', eventData.password);
  formData.append('gender', eventData.gender);
  formData.append('age', eventData.age);
  await axios.post(URLcreate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function updateHouseWorker(houseWorkerId, eventData) {
  const URLupdate = houseWorkerId ? `${endpoints.houseWorker.root}/${houseWorkerId}` : '';

  const formData = new FormData();
  formData.append('name', eventData.name);
  formData.append('avatar', eventData.avatar);
  formData.append('username', eventData.username);
  formData.append('gender', eventData.gender);
  formData.append('age', eventData.age);

  await axios.patch(URLupdate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export async function deleteHouseWorker(houseWorkerId) {
  const URLdelete = houseWorkerId ? `${endpoints.houseWorker.root}/${houseWorkerId}` : '';
  const URLlist = [endpoints.houseWorker.list, { params: { limit: 10000 } }];

  await axios.delete(URLdelete);

  mutate(URLlist, (currentData) => {
    if (!currentData) return currentData;
    const newResult = currentData.result.filter((item) => item.id !== houseWorkerId);
    const newMetadata = { ...currentData.metadata, total: newResult.length };
    return {
      ...currentData,
      metadata: newMetadata,
      result: newResult,
    };
  });
}

export async function resetPassword(eventData, houseWorkerId) {
  const URL = endpoints.houseWorker.resetPassword;
  const data = {
    houseWorkerId,
    newPassword: eventData.password,
  }
  try {
    await axios.post(URL, data)
  } catch (error) {
    await Promise.reject(new Error('Đặt mật khẩu thất bại'))
  }
}
