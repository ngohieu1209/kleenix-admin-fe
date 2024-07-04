import _ from 'lodash';

export function sumIncomeByYear(data, inputYear) {
  // Tìm đối tượng năm trong mảng
  const yearData = _.find(data, { year: inputYear.toString() });

  // Nếu không tìm thấy đối tượng năm, trả về 0
  if (!yearData) return 0;

  // Tính tổng các giá trị khác null trong mảng data
  const totalIncome = _.reduce(yearData.data, (total, currentItem) => {
    const result = _.reduce(currentItem.data, (sum, value) => {
      // Chỉ cộng giá trị nếu nó không phải là null
      return value !== null ? sum + value : sum;
    }, 0);
    return total + result;
  }, 0);

  return totalIncome;
}

export function fBookingStatus(status) {
  if(status === 'PENDING')
    return 'Đang chờ'
  if(status === 'DELIVERY')
    return 'Đang di chuyển'
  if(status === 'WORKING')
    return 'Đang làm việc'
  if(status === 'COMPLETED')
    return 'Hoàn thành'
  if(status === 'CANCELLED_BY_CUSTOMER') {
    return 'Đã hủy bởi khách hàng'
  }
  if(status === 'CANCELLED_BY_KLEENIX') {
    return 'Đã hủy bởi Kleenix'
  }
  if(status === 'CONFIRMED')
    return 'Đã xác nhận'
  return ''
}
