import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useGetPromotions, deletePromotion } from 'src/api/promotion';

import Iconify from 'src/components/iconify';
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

import PromotionTableRow from '../promotion-table-row';
import PromotionTableToolbar from '../promotion-table-toolbar';
import PromotionTableFiltersResult from '../promotion-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên khuyến mãi' },
  { id: 'description', label: 'Miêu tả', width: 280 },
  { id: 'point', label: 'Điểm đổi', width: 120, align: 'center'},
  { id: 'startTime', label: 'Hiệu lực', width: 160, align: 'center'},
  { id: 'activate', label: 'Hoạt động', width: 120, align: 'center'},
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
};

// ----------------------------------------------------------------------

export default function PromotionListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  const { promotions } = useGetPromotions();

  useEffect(() => {
    if (promotions.length) {
      setTableData(promotions);
    }
  }, [promotions]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

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

  const handleDeleteRow = useCallback(
    async (id) => {
      await deletePromotion(id);
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );


  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.promotion.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.promotion.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  useEffect(() => {
    const savedPage = parseInt(sessionStorage.getItem("promotion-page"), 10) - 1;
    const savedRowsPerPage = parseInt(sessionStorage.getItem("promotion-rows"), 10);

    if (!_.isNaN(savedPage) && savedPage >= 0) {
      table.onChangePage(null, savedPage);
    }

    if (!_.isNaN(savedRowsPerPage) && savedRowsPerPage > 0) {
      table.setRowsPerPage(savedRowsPerPage);
    }
  }, [table]);

  const handlePageChange = (event, newPage) => {
    table.onChangePage(event, newPage);
    sessionStorage.setItem("promotion-page", newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    table.onChangeRowsPerPage(event, newRowsPerPage);
    sessionStorage.setItem("promotion-rows", newRowsPerPage);
    table.onChangePage(null, 0);
    sessionStorage.setItem("promotion-page", 1);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Danh sách khuyến mãi"
        links={[]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.promotion.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Tạo khuyến mãi
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <PromotionTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <PromotionTableFiltersResult
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
                    <PromotionTableRow
                      key={row.id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
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
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name } = filters;

  const stabilizedThis = _.map(inputData, (el, index) => [el, index]);


  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    sessionStorage.removeItem("promotion-page");
    inputData = inputData.filter(
      (promotion) => promotion.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
