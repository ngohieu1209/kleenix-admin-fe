import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import HouseWorkerNewEditForm from '../house-worker-new-edit-form';

// ----------------------------------------------------------------------

export default function HouseWorkerCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Tạo tài khoản nhân viên"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <HouseWorkerNewEditForm />
    </Container>
  );
}
