import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const { MONGO_URL } = process.env;

/**
 * Establishes a connection to the MongoDB database using the provided MONGO_URL.
 */
const connectToDatabase = async (): Promise<void> => {
  await mongoose
          .connect(`${MONGO_URL}`, { retryWrites: true, w: 'majority' })
            .then(() => {
              console.log("Connected to DB");
          })
          .catch((error) => {
            console.log("Failed to connect to DB");
            console.log(error);
          });
};

export { connectToDatabase };