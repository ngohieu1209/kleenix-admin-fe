import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';
import Image from 'src/components/image/image';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const image = (name) => (
  <Image src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  folder: icon('ic_folder'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  dashboard: icon('ic_dashboard'),
  house: image('house'),
  cleaningCart: image('cleaning-cart'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // SERVICE
          {
            title: t('Dịch vụ'),
            path: paths.dashboard.service.root,
            icon: ICONS.house,
          },
          // EXTRA SERVICE
          {
            title: t('Dịch vụ thêm'),
            path: paths.dashboard.extraService.root,
            icon: ICONS.cleaningCart,
          },
          // BOOKING
          {
            title: t('Theo dõi đặt lịch'),
            path: paths.dashboard.booking.root,
            icon: ICONS.cleaningCart,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
