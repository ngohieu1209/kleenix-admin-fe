import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetPromotion } from 'src/api/promotion'

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { PromotionDetailsSkeleton } from '../promotion-skeleton'
import PromotionDetailsToolbar from '../promotion-details-toolbar';
import PromotionDetailsContent from '../promotion-details-content';

// ----------------------------------------------------------------------

export default function PromotionDetailsView({ id }) {
  const { promotion, promotionLoading, promotionError } = useGetPromotion(id)
  const settings = useSettingsContext();

  const renderSkeleton = <PromotionDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${promotionError?.message}`}
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
      value='promotion'
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      <Tab
        key='promotion'
        iconPosition="end"
        value='promotion'
        label="Chi tiết khuyến mãi"
      />
    </Tabs>
  );

  const renderPromotion = promotion && (
    <>
      <PromotionDetailsToolbar
        backLink={paths.dashboard.promotion.root}
        liveLink="#"
      />
      {renderTabs}

      <PromotionDetailsContent promotion={promotion} />
    </>
  )

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {promotionLoading && renderSkeleton}

      {promotionError && renderError}

      {promotion && renderPromotion}
    </Container>
  );
}

PromotionDetailsView.propTypes = {
  id: PropTypes.string,
};
