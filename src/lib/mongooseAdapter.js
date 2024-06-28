import { ObjectId } from 'mongodb';

export default function MongooseAdapter(clientPromise) {
  return {
    async getAdapter(appOptions) {
      const client = await clientPromise;
      const db = client.db();
      const Users = db.collection('users');
      const Accounts = db.collection('accounts');
      const Sessions = db.collection('sessions');
      const VerificationTokens = db.collection('verificationTokens');

      return {
        async createUser(profile) {
          const user = { ...profile, emailVerified: profile.emailVerified || null };
          await Users.insertOne(user);
          return user;
        },
        async getUser(id) {
          return await Users.findOne({ _id: ObjectId(id) });
        },
        async getUserByEmail(email) {
          return await Users.findOne({ email });
        },
        async getUserByAccount({ providerAccountId, provider }) {
          const account = await Accounts.findOne({ providerAccountId, provider });
          if (!account) return null;
          return await Users.findOne({ _id: account.userId });
        },
        async updateUser(user) {
          const { _id, ...data } = user;
          await Users.updateOne({ _id: ObjectId(_id) }, { $set: data });
          return user;
        },
        async linkAccount(account) {
          await Accounts.insertOne(account);
          return account;
        },
        async createSession({ sessionToken, userId, expires }) {
          await Sessions.insertOne({ sessionToken, userId: ObjectId(userId), expires });
          return { sessionToken, userId, expires };
        },
        async getSessionAndUser(sessionToken) {
          const session = await Sessions.findOne({ sessionToken });
          if (!session) return null;
          const user = await Users.findOne({ _id: ObjectId(session.userId) });
          return { session, user };
        },
        async updateSession({ sessionToken, expires }) {
          await Sessions.updateOne({ sessionToken }, { $set: { expires } });
          return await Sessions.findOne({ sessionToken });
        },
        async deleteSession(sessionToken) {
          await Sessions.deleteOne({ sessionToken });
        },
        async createVerificationToken({ identifier, token, expires }) {
          await VerificationTokens.insertOne({ identifier, token, expires });
          return { identifier, token, expires };
        },
        async useVerificationToken({ identifier, token }) {
          const verificationToken = await VerificationTokens.findOne({ identifier, token });
          if (!verificationToken) return null;
          await VerificationTokens.deleteOne({ identifier, token });
          return verificationToken;
        },
      };
    },
  };
}
