import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetHouseWorker } from 'src/api/house-worker'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import HouseWorkerNewEditForm from '../house-worker-new-edit-form';

// ----------------------------------------------------------------------

export default function HouseWorkerEditView({ id }) {
  const settings = useSettingsContext();

  const { houseWorker: currentHouseWorker } = useGetHouseWorker(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sửa thông tin người giúp việc"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <HouseWorkerNewEditForm currentHouseWorker={currentHouseWorker} />
    </Container>
  );
}

HouseWorkerEditView.propTypes = {
  id: PropTypes.string,
};
