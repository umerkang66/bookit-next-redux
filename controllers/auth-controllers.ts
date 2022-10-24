import User from '../models/user';
import { catchAsync } from '../utils/catch-async';

export const signup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: 'FAKE_PUBLIC_ID', url: 'FAKE_URL' },
  });

  res.status(200).json({
    success: true,
    user,
  });
});
