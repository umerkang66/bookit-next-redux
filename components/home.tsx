import { type FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useTypedSelector } from '../hooks/use-typed-selector';
import RoomItem from './room/room-item';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home: FC = () => {
  const router = useRouter();
  const allRoomsState = useTypedSelector(state => state.allRooms);
  const { rooms, error, totalRooms } = allRoomsState;

  const page = parseInt((router.query.page as string) || '1');
  const search = router.query.search;
  const guestCapacity = router.query.guestCapacity;
  const category = router.query.category;

  useEffect(() => {
    if (error) toast.error(error);
  });

  const handlePagination = (pageNumber: number) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {search ? `Rooms in ${search}` : 'All Rooms'}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {!error && rooms.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No Rooms Found</b>
            </div>
          ) : (
            rooms.map(room => {
              return <RoomItem key={room._id} room={room} />;
            })
          )}
        </div>
      </section>

      {!guestCapacity && !category && !search && rooms.length < totalRooms && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={rooms.length}
            totalItemsCount={totalRooms}
            onChange={handlePagination}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            // these are our classes in our css
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
