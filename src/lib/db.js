import mongoose from 'mongoose';

let cached = {
    conn: null,
    promise: null,
};

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    } else {
        const MONGO_URL = process.env.MONGO_URL;
        if (!MONGO_URL) {
            throw new Error('Please define the MONGO_URL environment variable inside .env.local');
        }

        const promise = mongoose.connect(MONGO_URL, {
            autoIndex: true,
        });

        cached = {
            conn: await promise,
            promise,
        }

        console.log("Connected");
        return await promise;
    }
}
