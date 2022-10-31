import { NextPage } from 'next';
import { Action } from 'redux';
import UpdateRoom from '../../../components/admin/update-room';
import { actionCreators } from '../../../state';
import { wrapper } from '../../../state/store';

const RoomPage: NextPage = () => {
  return <UpdateRoom />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const action = actionCreators.getRoom(
      context.req,
      context.params?.id as string
    );
    await store.dispatch(action as unknown as Action<any>);

    return { props: {} };
  }
);

export default RoomPage;
