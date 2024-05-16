import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetHouseWorker } from 'src/api/house-worker'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { HouseWorkerDetailsSkeleton } from '../house-worker-skeleton'
import HouseWorkerDetailsToolbar from '../house-worker-details-toolbar';
import HouseWorkerDetailsContent from '../house-worker-details-content';

// ----------------------------------------------------------------------

export default function HouseWorkerDetailsView({ id }) {
  const { houseWorker, houseWorkerLoading, houseWorkerError } = useGetHouseWorker(id)
  const settings = useSettingsContext();

  const renderSkeleton = <HouseWorkerDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${houseWorkerError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.houseWorker.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Trở lại
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderTabs = (
    <Tabs
      value='service'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='service'
        iconPosition="end"
        value='service'
        label="Chi tiết"
      />
    </Tabs>
  );

  const renderService = houseWorker && (
    <>
      <HouseWorkerDetailsToolbar
        backLink={paths.dashboard.houseWorker.root}
        liveLink="#"
      />
      {renderTabs}

      <HouseWorkerDetailsContent houseWorker={houseWorker} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {houseWorkerLoading && renderSkeleton}

      {houseWorkerError && renderError}

      {houseWorker && renderService}
    </Container>
  );
}

HouseWorkerDetailsView.propTypes = {
  id: PropTypes.string,
};
