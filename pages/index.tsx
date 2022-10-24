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
    let page = parseInt((context.query.page as string) || '1');

    const action = actionCreators.getAllRooms(context.req, page);
    await store.dispatch(action as unknown as DefaultAction);

    // just for the sake of typescript error
    return { props: {} };
  };
});

export default HomePage;
