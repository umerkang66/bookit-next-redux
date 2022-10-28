import { FC, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/button-loader';
import { useActions } from '../../hooks/use-actions';

const ResetPassword: FC<{ token: string | undefined }> = ({ token }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();
  const actions = useActions();

  const { error, loading, successMessage } = useTypedSelector(
    state => state.resetPassword
  );

  useEffect(() => {
    if (!token) toast.error('Please provide token in url');
    // here user already will be signout
    if (error) toast.error(error);
    if (successMessage) {
      toast.success(successMessage);
      router.push('/auth/signin');
    }
  }, [router, token, error, successMessage]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    actions.resetPassword(token as string, password, passwordConfirm);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
