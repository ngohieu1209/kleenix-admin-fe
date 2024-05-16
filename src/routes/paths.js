const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  // AUTH
  auth: {
    classic: {
      login: `${ROOTS.AUTH}/login`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}/service`,
    service: {
      root: `${ROOTS.DASHBOARD}/service`,
      new: `${ROOTS.DASHBOARD}/service/new`,
      details: (id) => `${ROOTS.DASHBOARD}/service/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/service/${id}/edit`,
    },
    extraService: {
      root: `${ROOTS.DASHBOARD}/extra-service`,
      new: `${ROOTS.DASHBOARD}/extra-service/new`,
      details: (id) => `${ROOTS.DASHBOARD}/extra-service/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/extra-service/${id}/edit`,
    },
    booking: {
      root: `${ROOTS.DASHBOARD}/booking`,
      details: (id) => `${ROOTS.DASHBOARD}/booking/${id}`,
    },
    houseWorker: {
      root: `${ROOTS.DASHBOARD}/house-worker`,
      new: `${ROOTS.DASHBOARD}/house-worker/new`,
      details: (id) => `${ROOTS.DASHBOARD}/house-worker/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/house-worker/${id}/edit`,
    },
  },
};
