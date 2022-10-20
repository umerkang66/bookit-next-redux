import mongoose from 'mongoose';

export const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // if the connection connected, connecting, just return
    return;
  }
  // only if the connection is disconnected, run this line
  await mongoose.connect(process.env.DB_URI!);
  console.log('Connected to DB');
};
