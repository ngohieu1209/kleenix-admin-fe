import _ from 'lodash';

export function fCodeBooking(str) {
  return str ? str.slice(0, 8) : '';
}

export function fShortenString(str) {
  if(str) {
    if(str.length <= 30) {
      return str;
    }
    return _.concat(str.slice(0, 30), '...');
  }
  return '';
}

export function fCheckAbleToCancelledStatus(status) {
  if(status === 'COMPLETED')
    return false
  if(status.includes('CANCELLED')) {
    return false
  }
  return true
}
