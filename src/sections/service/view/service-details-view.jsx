import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetService } from 'src/api/service'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { ServiceDetailsSkeleton } from '../service-skeleton'
import ServiceDetailsToolbar from '../service-details-toolbar';
import ServiceDetailsContent from '../service-details-content';

// ----------------------------------------------------------------------

export default function ServiceDetailsView({ id }) {
  const { service, serviceLoading, serviceError } = useGetService(id)
  const settings = useSettingsContext();

  const renderSkeleton = <ServiceDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${serviceError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.service.root}
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
        label="Chi tiết dịch vụ"
      />
    </Tabs>
  );

  const renderService = service && (
    <>
      <ServiceDetailsToolbar
        backLink={paths.dashboard.service.root}
        liveLink="#"
      />
      {renderTabs}

      <ServiceDetailsContent service={service} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {serviceLoading && renderSkeleton}

      {serviceError && renderError}

      {service && renderService}
    </Container>
  );
}

ServiceDetailsView.propTypes = {
  id: PropTypes.string,
};
