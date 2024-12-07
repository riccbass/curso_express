import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/testemongodb2";

const client = new MongoClient(uri);

const run = async () => {
  try {
    await client.connect();
    console.log("Conectando ao mongo db!");
  } catch (err) {
    console.log(err);
  }
};

run();

export default client;
