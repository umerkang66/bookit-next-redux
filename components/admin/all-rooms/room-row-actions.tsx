import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Room } from '../../../common-types';
import { useActions } from '../../../hooks/use-actions';
import { useAsyncAction } from '../../../hooks/use-async-action';
import { useTypedSelector } from '../../../hooks/use-typed-selector';

interface Props {
  room: Room;
}

const RoomRowActions: FC<Props> = ({ room }) => {
  const actions = useActions();
  const router = useRouter();

  const [deleteRoom, loading, error] = useAsyncAction(actions.adminDeleteRoom);
  const { successMessage } = useTypedSelector(state => state.admin.deleteRoom);

  useEffect(() => {
    if (error) toast.error(error);
    if (successMessage) router.push('/admin/rooms');
  }, [error, successMessage, router]);

  return (
    <div>
      <Link href={`/admin/rooms/${room._id}`}>
        <a className="btn btn-primary">
          <i className="fa fa-pencil" />
        </a>
      </Link>

      <button
        style={{ position: 'relative', height: '38px', width: '38px' }}
        onClick={() => deleteRoom(room._id)}
        className="btn btn-danger mx-2"
      >
        {loading ? (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -68%)',
            }}
          >
            ...
          </span>
        ) : (
          <i className="fa fa-trash" />
        )}
      </button>
    </div>
  );
};

export default RoomRowActions;
