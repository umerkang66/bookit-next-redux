import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const Header = () => {
  const { user, error, loading } = useTypedSelector(state => state.currentuser);

  const logoutHandler = (): void => {
    signOut();
  };

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <Image
                style={{ cursor: 'pointer' }}
                src="/images/bookit_logo.png"
                alt="BookIT"
                height="60"
                width="200"
              />
            </Link>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <Image
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                    layout="fixed"
                    height="40"
                    width="40"
                  />
                </figure>
                <span>{user && user.name}</span>
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/bookings/me">
                  <a className="dropdown-item">My Bookings</a>
                </Link>

                <Link href="/auth/me/update">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/ ">
                  <a
                    onClick={logoutHandler}
                    className="dropdown-item text-danger"
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/auth/signin">
              <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
