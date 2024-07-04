import isEqual from 'lodash/isEqual';
import { endOfDay, startOfDay } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetFeedbacks } from 'src/api/feedback';

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
import { fTimestamp } from 'src/utils/format-time';
import FeedbackTableRow from '../feedback-table-row';
import FeedbackTableToolbar from '../feedback-table-toolbar';
import FeedbackTableFiltersResult from '../feedback-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Khách hàng' },
  { id: 'booking', label: 'Mã đơn booking', width: 180 },
  { id: 'createdAt', label: 'Ngày đặt', width: 180 },
  { id: 'feedback', label: 'Phản hồi', width: 300},
  { id: 'rating', label: 'Đánh giá', width: 120 },
  { id: '', width: 88 },
];

const defaultFilters = {
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function FeedbackListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  const { feedbacks } = useGetFeedbacks();

  useEffect(() => {
    if (feedbacks.length) {
      setTableData(feedbacks);
    }
  }, [feedbacks]);

  const [filters, setFilters] = useState(defaultFilters);
  const dateError = filters.startDate && filters.endDate ? filters.startDate.getTime() > filters.endDate.getTime() : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError
  });


  const canReset = !isEqual(defaultFilters, filters);

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
      router.push(paths.dashboard.feedback.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Danh sách đánh giá"
        links={[]}
        // action={}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <FeedbackTableToolbar filters={filters} onFilters={handleFilters} dateError={dateError} />

        {canReset && (
          <FeedbackTableFiltersResult
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
                    <FeedbackTableRow
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
  const { startDate, endDate, status } = filters;

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

  return inputData;
}
