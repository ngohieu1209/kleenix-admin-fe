import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BookingDetailsView } from 'src/sections/booking/view';

// ----------------------------------------------------------------------

export default function BookingDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Booking Details</title>
      </Helmet>

      <BookingDetailsView id={`${id}`} />
    </>
  );
}
