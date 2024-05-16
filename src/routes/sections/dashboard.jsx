import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
// SERVICE
const ServiceListPage = lazy(() => import('src/pages/dashboard/service/list'));
const ServiceCreatePage = lazy(() => import('src/pages/dashboard/service/new'));
const ServiceEditPage = lazy(() => import('src/pages/dashboard/service/edit'));
const ServiceDetailsPage = lazy(() => import('src/pages/dashboard/service/details'));
// EXTRA SERVICE
const ExtraServiceListPage = lazy(() => import('src/pages/dashboard/extra-service/list'));
const ExtraServiceCreatePage = lazy(() => import('src/pages/dashboard/extra-service/new'));
const ExtraServiceEditPage = lazy(() => import('src/pages/dashboard/extra-service/edit'));
const ExtraServiceDetailsPage = lazy(() => import('src/pages/dashboard/extra-service/details'));
// BOOKING
const BookingListPage = lazy(() => import('src/pages/dashboard/booking/list'));
const BookingDetailsPage = lazy(() => import('src/pages/dashboard/booking/details'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Navigate to={PATH_AFTER_LOGIN} replace />,
      },
      {
        path: 'service',
        children: [
          { element: <ServiceListPage />, index: true },
          { path: 'list', element: <ServiceListPage /> },
          { path: ':id', element: <ServiceDetailsPage /> },
          { path: 'new', element: <ServiceCreatePage /> },
          { path: ':id/edit', element: <ServiceEditPage /> },
        ],
      },
      {
        path: 'extra-service',
        children: [
          { element: <ExtraServiceListPage />, index: true },
          { path: 'list', element: <ExtraServiceListPage /> },
          { path: ':id', element: <ExtraServiceDetailsPage /> },
          { path: 'new', element: <ExtraServiceCreatePage /> },
          { path: ':id/edit', element: <ExtraServiceEditPage /> },
        ],
      },
      {
        path: 'booking',
        children: [
          { element: <BookingListPage />, index: true },
          { path: 'list', element: <BookingListPage /> },
          { path: ':id', element: <BookingDetailsPage /> },
        ],
      },
    ],
  },
];
