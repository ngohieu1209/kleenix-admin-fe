import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetExtraService } from 'src/api/extra-service'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExtraServiceNewEditForm from '../extra-service-new-edit-form';

// ----------------------------------------------------------------------

export default function ExtraServiceEditView({ id }) {
  const settings = useSettingsContext();

  const { extraService: currentExtraService } = useGetExtraService(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sửa thông tin dịch vụ"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExtraServiceNewEditForm currentExtraService={currentExtraService} />
    </Container>
  );
}

ExtraServiceEditView.propTypes = {
  id: PropTypes.string,
};
