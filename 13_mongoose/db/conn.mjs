import mongoose from "mongoose";

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/testemongodb3");
  console.log("conectou ao MongoDB como moongose!");
};

main().catch((err) => console.log(err));

export default mongoose;
