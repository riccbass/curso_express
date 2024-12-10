import mongoose from "mongoose";

// const uri = "mongodb://localhost:27017/testemongodb2";
const uri = "mongodb://localhost:27017/teste_monngose_2";

const main = async () => {
  await mongoose.connect(uri);
  console.log("Conectou ao MongoDB com Mongoose!");
};

main().catch((err) => console.log(err));

export default mongoose;
