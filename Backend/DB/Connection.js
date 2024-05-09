import { connect } from "mongoose";

const Connection = async (url) => {
  try {
    await connect(url, { dbName: "Snapgram" });
  } catch (error) {
    console.log(error.message);
  }
};

export default Connection;
