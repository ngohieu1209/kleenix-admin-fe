import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetExtraService } from 'src/api/extra-service'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { ExtraServiceDetailsSkeleton } from '../extra-service-skeleton'
import ExtraServiceDetailsToolbar from '../extra-service-details-toolbar';
import ExtraServiceDetailsContent from '../extra-service-details-content';

// ----------------------------------------------------------------------

export default function ExtraServiceDetailsView({ id }) {
  const { extraService, extraServiceLoading, extraServiceError } = useGetExtraService(id)
  const settings = useSettingsContext();

  const renderSkeleton = <ExtraServiceDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${extraServiceError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.extraService.root}
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
      value='extraService'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='extraService'
        iconPosition="end"
        value='extraService'
        label="Chi tiết dịch vụ thêm"
      />
    </Tabs>
  );

  const renderExtraService = extraService && (
    <>
      <ExtraServiceDetailsToolbar
        backLink={paths.dashboard.extraService.root}
        liveLink="#"
      />
      {renderTabs}

      <ExtraServiceDetailsContent extraService={extraService} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {extraServiceLoading && renderSkeleton}

      {extraServiceError && renderError}

      {extraService && renderExtraService}
    </Container>
  );
}

ExtraServiceDetailsView.propTypes = {
  id: PropTypes.string,
};
