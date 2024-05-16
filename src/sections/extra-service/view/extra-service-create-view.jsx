import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExtraServiceNewEditForm from '../extra-service-new-edit-form';

// ----------------------------------------------------------------------

export default function ExtraServiceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Tạo dịch vụ thêm mới"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExtraServiceNewEditForm />
    </Container>
  );
}
