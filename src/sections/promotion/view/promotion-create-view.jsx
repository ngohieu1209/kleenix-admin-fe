import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PromotionNewEditForm from '../promotion-new-edit-form';

// ----------------------------------------------------------------------

export default function PromotionCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Tạo khuyến mãi mới"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PromotionNewEditForm />
    </Container>
  );
}
