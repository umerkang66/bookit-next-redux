import { MDBDataTable } from 'mdbreact';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

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
  const allAdminRoomsState = useTypedSelector(state => state.allAdminRooms);
  const adminDeleteRoomsState = useTypedSelector(
    state => state.adminDeleteRoom
  );

  const actions = useActions();
  const router = useRouter();

  const { error, rooms, totalRooms } = allAdminRoomsState;
  const {
    error: deleteError,
    loading: deleteLoading,
    successMessage: deleteSuccessMessage,
  } = adminDeleteRoomsState;

  useEffect(() => {
    if (error) toast.error(error);
    if (deleteError) toast.error(deleteError);
    if (deleteSuccessMessage) router.push('/admin/rooms');
  }, [error, deleteError, deleteSuccessMessage]);

  const deleteRoomHandler = (id: string) => {
    actions.adminDeleteRoomAction(id);
  };

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
          actions: (
            <div>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil" />
                </a>
              </Link>

              <button
                onClick={() => deleteRoomHandler(room._id.toString())}
                className="btn btn-danger mx-2"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          ),
        });
      });

    return data;
  };

  return (
    <div className="container container-fluid">
      <h1 className="my-5">
        {`${rooms && rooms.length} Rooms`}

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
