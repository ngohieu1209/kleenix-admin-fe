import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetService } from 'src/api/service'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ServiceNewEditForm from '../service-new-edit-form';

// ----------------------------------------------------------------------

export default function ServiceEditView({ id }) {
  const settings = useSettingsContext();

  const { service: currentService } = useGetService(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sửa thông tin dịch vụ"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ServiceNewEditForm currentService={currentService} />
    </Container>
  );
}

ServiceEditView.propTypes = {
  id: PropTypes.string,
};
