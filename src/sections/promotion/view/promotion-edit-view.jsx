import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetPromotion } from 'src/api/promotion'

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PromotionNewEditForm from '../promotion-new-edit-form';

// ----------------------------------------------------------------------

export default function PromotionEditView({ id }) {
  const settings = useSettingsContext();

  const { promotion } = useGetPromotion(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Sửa thông tin dịch vụ"
        links={[]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PromotionNewEditForm promotion={promotion} />
    </Container>
  );
}

PromotionEditView.propTypes = {
  id: PropTypes.string,
};
