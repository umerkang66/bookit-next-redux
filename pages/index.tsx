import type { NextPage } from 'next';
import Home from '../components/home';
import { wrapper } from '../state/store';
import { actionCreators } from '../state';
import { Action as DefaultAction } from 'redux';

const HomePage: NextPage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(store => {
  return async context => {
    const action = actionCreators.getAllRooms(context.req);
    await store.dispatch(action as unknown as DefaultAction);

    // just for the sake of typescript error
    return { props: {} };
  };
});

export default HomePage;
