import mongoose, { mongo } from "mongoose";
const connection = {};

const connectToDB = async () => {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, // Set to true to use the new MongoDB connection string parser.
    useUnifiedTopology: true, // Set to true to use the new Server Discovery and Monitoring engine.
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
};

const disConnectDB = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnecting from the database");
    }
  }
};

const db = { connectToDB, disConnectDB };

export default db;
