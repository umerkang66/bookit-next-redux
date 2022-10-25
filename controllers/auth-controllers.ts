import User from '../models/user';
import { catchAsync } from '../utils/catch-async';
import cd from 'cloudinary';

// Setting up cloudinary config
const cloudinary = cd.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export const signup = catchAsync(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatar',
    transformation: {
      width: '150',
      crop: 'scale',
    },
  });

  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
    avatar: { public_id: result.public_id, url: result.secure_url },
  });

  res.status(200).json({
    success: true,
    message: 'User registered successfully',
  });
});
