import crypto from 'crypto';
import cd from 'cloudinary';
import User from '../models/user';
import { catchAsync } from '../utils/catch-async';
import { CustomError } from '../utils/custom-error';
import { sendEmail } from '../utils/email';
import absoluteUrl from 'next-absolute-url';

// Setting up cloudinary config
const cloudinary = cd.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});
const DEFAULT_IMAGE_URL = '/images/default_avatar.jpg';

export const signup = catchAsync(async (req, res) => {
  const randomId = Math.random().toString(36).substr(2, 15);
  let result = {
    public_id: randomId,
    secure_url: DEFAULT_IMAGE_URL,
  };

  if (req.body.avatar) {
    result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatar',
      transformation: {
        width: '150',
        crop: 'scale',
      },
    });
  }

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

// requireAuth middleware runs before this
export const getCurrentUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.status(200).json({ success: true, user });
});

// requireAuth middleware runs before this
export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return next(new CustomError('User currently does not exist', 400));
  }

  const previousImageId = user.avatar.public_id;
  const previousImageUrl = user.avatar.url;

  // destroy the user's previous image, and replace that with user's new image
  if (previousImageUrl !== DEFAULT_IMAGE_URL) {
    await cloudinary.uploader.destroy(previousImageId);
  }

  await user.remove();
  res.status(200).json({ success: true });
});

export const deleteAllUsers = catchAsync(async (req, res) => {
  await User.deleteMany({});
  res.status(200).json({ success: true, message: 'All users deleted' });
});

// THESE ROUTES REQUIRES "ID"
// requireAuth middleware runs before this
// /api/me/update
export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return next(new CustomError('User currently does not exist', 400));
  }

  if (req.body.name && req.body.name !== user.name) user.name = req.body.name;
  if (req.body.email && req.body.email !== user.email)
    user.email = req.body.email;
  if (req.body.password) user.password = req.body.password;

  if (req.body.avatar) {
    // this will only happen if user provided an avatar
    const previousImageId = user.avatar.public_id;
    const previousImageUrl = user.avatar.url;

    // destroy the user's previous image, and replace that with user's new image
    if (previousImageUrl !== DEFAULT_IMAGE_URL) {
      await cloudinary.uploader.destroy(previousImageId);
    }

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatar',
      transformation: {
        width: '150',
        crop: 'scale',
      },
    });

    user.avatar.public_id = result.public_id;
    user.avatar.url = result.secure_url;
  }

  await user.save();
  res.status(200).json({ success: true, message: 'User updated successfully' });
});

// requireAuth will NOT run before this
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new CustomError('User currently does not exist', 400));
  }

  const from = `BookIt <noreply@bookit.com>`;
  const subject = 'Reset your password';
  const resetToken = await user.getResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${
    absoluteUrl(req).origin
  }/auth/reset-password/${resetToken}`;

  const text = `Your password reset url:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, Please just ignore it`;

  try {
    await sendEmail({ from, to: req.body.email, subject, text });
  } catch (err: any) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const errorMsg =
      err.message || 'Unfortunately email cannot be sent for some reason';
    return next(new CustomError(errorMsg, 500));
  }

  const successMsg = 'Recovery email has been sent to your email address';
  res.status(200).json({
    success: true,
    message: successMsg,
  });
});

// requireAuth will NOT run before this
export const resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.query.token as string)
    .digest();

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    // it means token is not expired yet
    resetPasswordExpire: { $gte: Date.now() },
  });

  if (!user) {
    return next(new CustomError('Token is invalid or expired', 400));
  }
  if (password !== passwordConfirm) {
    return next(
      new CustomError("Password and Password confirm don't match", 400)
    );
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const successMsg = 'Your password has been reset';
  res.status(200).json({
    success: true,
    message: successMsg,
  });
});
