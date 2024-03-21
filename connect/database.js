import mongoose from "mongoose";
import dotenv from "dotenv";
const connects = async () => {
  try {
    await mongoose.connect(dotenv.config().parsed.DB_URL);
    console.log(`Ket noi Db thanh cong`);
  } catch (error) {
    console.log(`Khong the ket noi DB. Loi ${error}`);
  }
};
export default connects;
