import { FC } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import RoomItem from './room/room-item';

const Home: FC = () => {
  const allRoomsState = useTypedSelector(state => state.allRooms);
  const { rooms, error } = allRoomsState;

  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

      <a href="#" className="ml-2 back-to-search">
        {' '}
        <i className="fa fa-arrow-left"></i> Back to Search
      </a>
      <div className="row">
        {error && (
          <div className="alert alert-danger">
            <b>{error}</b>
          </div>
        )}
        {!error && rooms.length === 0 ? (
          <div className="alert alert-danger">
            <b>No Rooms Found</b>
          </div>
        ) : (
          rooms.map(room => {
            return <RoomItem key={room._id} room={room} />;
          })
        )}
      </div>
    </section>
  );
};

export default Home;
