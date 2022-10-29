import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '../../../models/user';
import { dbConnect } from '../../../utils/db-connect';

const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_JWT_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error('Please enter email of password');
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
          throw new Error('Invalid email of password');
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new Error('Invalid email of password');
        }

        // if we return obj, we let next-auth know that authorization succeeded
        // this obj will also be encoded in jwt as the user obj
        return { id: user.id, email: user.email };
      },
    }),
  ],
};

export default nextAuth(authOptions);
