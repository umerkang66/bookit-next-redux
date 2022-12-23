import { Action as DefaultAction } from 'redux';
import { getSession } from 'next-auth/react';
import AllAdminRooms from '../../../components/admin/all-rooms';
import { actionCreators } from '../../../state';
import { wrapper } from '../../../state/store';

const UpdateProfilePage = () => {
  return (
    <div>
      <AllAdminRooms />
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

    const action = actionCreators.adminGetAllRoomsAction(context.req);
    await store.dispatch(action as unknown as DefaultAction);

    // just for the sake of typescript error
    return { props: {} };
  }
);

export default UpdateProfilePage;
