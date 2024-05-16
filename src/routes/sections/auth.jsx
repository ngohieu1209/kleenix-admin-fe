import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
// AUTH
const ClassicLoginPage = lazy(() => import('src/pages/auth/classic/login'));

// ----------------------------------------------------------------------

const authClassic = {
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout
          title="Xin chào"
        >
          <ClassicLoginPage />
        </AuthClassicLayout>
      ),
    }
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authClassic],
  },
];
