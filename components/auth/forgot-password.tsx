import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/button-loader';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const actions = useActions();

  const { error, loading, successMessage } = useTypedSelector(
    state => state.forgotPassword
  );

  useEffect(() => {
    if (error) toast.error(error);
    if (successMessage) toast.success(successMessage);
  }, [error, successMessage]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.forgotPassword(email);
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={({ target: { value: changedEmail } }) =>
                setEmail(changedEmail)
              }
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            Send Email {loading && <ButtonLoader />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
