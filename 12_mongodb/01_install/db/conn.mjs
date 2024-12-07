import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/testenovo";
const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();
    console.log("conectando ao MongoDB!");
  } catch (err) {
    console.log(err);
  }
};

run();

export default client;
