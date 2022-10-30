import { getSession } from 'next-auth/react';
import { Action as DefaultAction } from 'redux';
import BookingDetails from '../../components/bookings/booking-details';
import { actionCreators } from '../../state';
import { wrapper } from '../../state/store';

const BookingPage = () => {
  return (
    <div>
      <BookingDetails />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const session = await getSession({ req: context.req });
    if (!session) {
      return {
        props: {},
        redirect: { destination: '/auth/signin' },
      };
    }

    const action = actionCreators.getBooking(
      context.req,
      context.params?.bookingId
    );
    await store.dispatch(action as unknown as DefaultAction);

    return { props: {} };
  }
);

export default BookingPage;
