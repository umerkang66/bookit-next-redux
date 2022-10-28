import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import ButtonLoader from '../layout/button-loader';
import { User } from '../../common-types';
import Image from 'next/image';

const UpdateUser = () => {
  const actions = useActions();
  const router = useRouter();
  const [changeForSignout, setChangeForSignout] = useState(false);

  // user cannot be null, because in the getServerSideProps, we are setting that if user is null, don't show this component
  const currentuser = useTypedSelector(state => state.currentuser).user as User;
  const {
    successMessage,
    error,
    loading: updateLoading,
  } = useTypedSelector(state => {
    return state.updateUser;
  });

  const [user, setUser] = useState({
    name: currentuser.name,
    email: currentuser.email,
    password: '',
  });
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(currentuser.avatar.url);

  useEffect(() => {
    const routeUser = async () => {
      if (successMessage) {
        if (changeForSignout) {
          await signOut();
          router.push('/auth/signin');
        } else {
          router.push('/');
        }
      }
      if (error) {
        toast.error(error);
      }
    };

    routeUser();
  }, [router, changeForSignout, successMessage, error]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentuser.email !== user.email || user.password) {
      setChangeForSignout(true);
    } else {
      setChangeForSignout(false);
    }

    actions.updateUserAction({
      name: user.name,
      email: user.email,
      password: user.password,
      avatar,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result as string);
          setAvatarPreview(reader.result as string);
        }
      };

      const files = e.target.files;
      if (files) reader.readAsDataURL(files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Update User</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={user.name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={user.email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={user.password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <Image
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                      height="60"
                      width="60"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              UPDATE {updateLoading && <ButtonLoader />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
