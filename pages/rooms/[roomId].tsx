import { NextPage } from 'next';
import { Action } from 'redux';
import RoomDetails from '../../components/room/room-details';
import { getRoom } from '../../state/action-creators';
import { wrapper } from '../../state/store';

const RoomPage: NextPage = () => {
  return <RoomDetails />;
};

// things
export const getServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const action = getRoom(context.req, context.params?.roomId as string);
    await store.dispatch(action as unknown as Action<any>);

    return { props: {} };
  }
);

export default RoomPage;
