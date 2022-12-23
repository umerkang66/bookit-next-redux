import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import RoomRowActions from './room-row-actions';

interface Data {
  columns: { label: string; field: string; sort: string }[];
  rows: {
    id: string;
    name: string;
    price: number;
    category: 'King' | 'Single' | 'Twins';
    actions: JSX.Element;
  }[];
}

const AllAdminRooms = () => {
  const { rooms, totalRooms } = useTypedSelector(state => state.admin.allRooms);

  const setRooms = () => {
    const data: Data = {
      columns: [
        { label: 'Room ID', field: 'id', sort: 'acs' },
        { label: 'Name', field: 'name', sort: 'acs' },
        { label: 'Price', field: 'price', sort: 'acs' },
        { label: 'Category', field: 'category', sort: 'acs' },
        { label: 'Actions', field: 'actions', sort: 'acs' },
      ],
      rows: [],
    };

    rooms &&
      rooms.forEach(room => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: room.price,
          category: room.category,
          actions: <RoomRowActions room={room} />,
        });
      });

    return data;
  };

  return (
    <div className="container container-fluid">
      <h1 className="my-5">
        {`${rooms && totalRooms} Rooms`}

        <Link href="/admin/rooms/new-room">
          <a className="mt-0 btn text-white float-right new-room-btn">
            Create new Room
          </a>
        </Link>
      </h1>

      <MDBDataTable
        data={setRooms()}
        className="px-3"
        noBottomColumns
        bordered
        striped
        hover
      />
    </div>
  );
};

export default AllAdminRooms;
