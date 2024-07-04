import _ from 'lodash';
import { mutate } from 'swr';

import axios, { endpoints } from 'src/utils/axios';

export async function createPackage(serviceId, eventData) {
  const URLcreate = endpoints.package.new;
  const URLDetailService = serviceId ? `${endpoints.service.detail}/${serviceId}` : '';
  const { data } = await axios.post(URLcreate, { ...eventData, serviceId });

  mutate(URLDetailService, (currentData) => {
    const newResult = [data.result, ...currentData.result.packages];
    const sortedResult = _.orderBy(newResult, [(item) => parseFloat(item.price)], ['asc']);
    return {
      ...currentData,
      result: {
        ...currentData.result,
        packages: sortedResult,
      },
    };
  });
}

export async function updatePackage(serviceId, packageId, eventData) {
  const URLupdate = packageId ? `${endpoints.package.root}/${packageId}` : '';
  const URLDetailService = serviceId ? `${endpoints.service.detail}/${serviceId}` : '';
  console.log('winter-eventData', eventData)
  await axios.patch(URLupdate, eventData);

  mutate(URLDetailService, (currentData) => {
    const newResult = _.map(currentData.result.packages, (item) => {
      if (item.id === packageId) {
        return {
          ...item,
          ...eventData,
        };
      }
      return item;
    });
    const sortedResult = _.orderBy(newResult, [(item) => parseFloat(item.price)], ['asc']);
    return {
      ...currentData,
      result: {
        ...currentData.result,
        packages: sortedResult,
      },
    };
  });
}

export async function deletePackage(serviceId, packageId) {
  const URLdelete = packageId ? `${endpoints.package.root}/${packageId}` : '';
  const URLDetailService = serviceId ? `${endpoints.service.detail}/${serviceId}` : '';

  await axios.delete(URLdelete);

  mutate(URLDetailService, (currentData) => {
    const newResult = currentData.result.packages.filter((item) => item.id !== packageId);
    return {
      ...currentData,
      result: {
        ...currentData.result,
        packages: newResult,
      },
    };
  });
}
