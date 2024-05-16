import { Helmet } from 'react-helmet-async';

import { ClassicLoginView } from 'src/sections/auth/classic';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <ClassicLoginView />
    </>
  );
}
