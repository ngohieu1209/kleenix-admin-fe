import { endOfDay, startOfDay } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetBookings } from 'src/api/booking';

import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Label from 'src/components/label';
import { fTimestamp } from 'src/utils/format-time';
import BookingTableRow from '../booking-table-row';
import BookingTableToolbar from '../booking-table-toolbar';
import BookingTableFiltersResult from '../booking-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Đang chờ' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'delivery', label: 'Đang di chuyển' },
  { value: 'working', label: 'Đang làm việc' },
  { value: 'completed', label: 'Đã hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Khách hàng' },
  { id: 'booking', label: 'Mã booking', width: 120 },
  { id: 'service', label: 'Dịch vụ', width: 240 },
  { id: 'dateTime', label: 'Ngày đặt', width: 160 },
  { id: 'totalPrice', label: 'Chi phí', width: 160},
  { id: 'status', label: 'Trạng thái', width: 100 },
  { id: '', width: 66 },
];

const defaultFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function BookingListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  const { bookings } = useGetBookings();

  useEffect(() => {
    if (bookings.length) {
      setTableData(bookings);
    }
  }, [bookings]);

  const [filters, setFilters] = useState(defaultFilters);
  const dateError = filters.startDate && filters.endDate ? filters.startDate.getTime() > filters.endDate.getTime() : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError
  });


  const canReset = !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.booking.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Danh sách đặt lịch"
        links={[]}
        // action={}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === 'pending' && 'warning') ||
                    (tab.value === 'confirmed' && 'success') ||
                    (tab.value === 'delivery' && 'warning') ||
                    (tab.value === 'working' && 'secondary') ||
                    (tab.value === 'completed' && 'info') ||
                    (tab.value === 'cancelled' && 'error') ||
                    'default'
                  }
                >
                  {tab.value === 'all' && bookings.length}
                  {tab.value === 'pending' &&
                    bookings.filter((booking) => booking.status === 'PENDING').length}

                  {tab.value === 'confirmed' &&
                    bookings.filter((booking) => booking.status === 'CONFIRMED').length}

                  {tab.value === 'delivery' &&
                    bookings.filter((booking) => booking.status === 'DELIVERY').length}

                  {tab.value === 'working' &&
                    bookings.filter((booking) => booking.status === 'WORKING').length}

                  {tab.value === 'completed' &&
                    bookings.filter((booking) => booking.status === 'COMPLETED').length}

                  {tab.value === 'cancelled' &&
                    bookings.filter((booking) => booking.status.includes('CANCELLED')).length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <BookingTableToolbar filters={filters} onFilters={handleFilters} dateError={dateError} />

        {canReset && (
          <BookingTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            //
            onResetFilters={handleResetFilters}
            //
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                onSort={table.onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <BookingTableRow
                      key={row.id}
                      row={row}
                      onViewRow={() => handleViewRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, startDate, endDate, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (booking) =>
          fTimestamp(booking.createdAt) >= fTimestamp(startOfDay(startDate)) &&
          fTimestamp(booking.createdAt) <= fTimestamp(endOfDay(endDate))
      )
    } else if(startDate) {
      inputData = inputData.filter(
        (booking) => fTimestamp(booking.createdAt) >= fTimestamp(startOfDay(startDate))
      )
    } else if(endDate) {
      inputData = inputData.filter(
        (booking) => fTimestamp(booking.createdAt) <= fTimestamp(endOfDay(endDate))
      )
    }
  }

  if (status !== 'all') {
    inputData = inputData.filter((booking) => booking.status.includes(status.toUpperCase()));
  }

  if(name) {
    inputData = inputData.filter((item) => item.id.includes(name));
  }

  return inputData;
}
