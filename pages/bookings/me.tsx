import { getSession } from 'next-auth/react';
import { Action as DefaultAction } from 'redux';
import Head from 'next/head';
import MyBookings from '../../components/bookings/my-bookings';
import { actionCreators } from '../../state';
import { wrapper } from '../../state/store';

const UpdateProfilePage = () => {
  return (
    <div>
      <Head>
        <title>My Bookings</title>
      </Head>
      <MyBookings />
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

    const action = actionCreators.getMyBookings(context.req);
    await store.dispatch(action as unknown as DefaultAction);

    return { props: {} };
  }
);

export default UpdateProfilePage;
