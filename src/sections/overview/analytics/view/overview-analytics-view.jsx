import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useSettingsContext } from 'src/components/settings';
import { useGetOverview } from 'src/api/overview';

import { OverviewSkeleton } from '../overviewSkeleton';

import AnalyticsCurrentVisits from '../analytics-current-visits';
import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AppTopCustomers from '../app-top-customer';
import AppTopHouseWorkers from '../app-top-house-worker';
import EcommerceCurrentBalance from '../ecommerce-current-balance';
import EcommerceYearlySales from '../ecommerce-yearly-sales';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsView() {
  const settings = useSettingsContext();
  const { overview, overviewLoading } = useGetOverview();

  const renderSkeleton = <OverviewSkeleton />;

  const renderContent = overview && (
    <Grid container spacing={3}>
      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Số lượng khách hàng"
          total={overview.common.totalCustomer}
          icon={<img alt="icon" src="/assets/icons/glass/human.png" />}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Số lượng nhân viên"
          total={overview.common.totalHouseWorker}
          color="info"
          icon={<img alt="icon" src="/assets/icons/glass/housekeeper.png" />}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Số lượng đơn đặt lịch"
          total={overview.common.totalBooking}
          color="warning"
          icon={<img alt="icon" src="/assets/icons/glass/smartphone.png" />}
        />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="Số lượt đánh giá"
          total={overview.common.totalFeedback}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/satisfaction.png" />}
        />
      </Grid>

      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          <EcommerceYearlySales
            title="Doanh thu theo năm"
            chart={{
              categories: [
                'Th.1',
                'Th.2',
                'Th.3',
                'Th.4',
                'Th.5',
                'Th.6',
                'Th.7',
                'Th.8',
                'Th.9',
                'Th.10',
                'Th.11',
                'Th.12',
              ],
              series: overview.analytics
            }}
          />
        </Stack>
      </Grid>

      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          <EcommerceCurrentBalance
            title={`Doanh thu hiện tại ( năm ${new Date().getFullYear()} )`}
            currentBalance={overview.balance.currentBalance}
            bookingAmount={overview.balance.bookingCompleted}
          />
          <AppTopCustomers title="Top khách hàng" list={overview.topCustomers} />
        </Stack>
      </Grid>

      <Grid xs={12} md={6} lg={6}>
        <AnalyticsCurrentVisits
          title="Trạng thái đơn đặt lịch"
          chart={{
            series: overview.statusOverview
          }}
        />
      </Grid>

      <Grid xs={12} md={6} lg={6}>
        <AppTopHouseWorkers title="Top nhân viên giúp việc" list={overview.topHouseWorkers} />
      </Grid>

    </Grid>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        KLEENIX, Xin chào 👋
      </Typography>

      {overviewLoading && renderSkeleton}

      {overview && renderContent}
    </Container>
  );
}
