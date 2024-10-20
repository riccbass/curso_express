import { Sequelize } from "sequelize";

const sequelize = new Sequelize("nodemvc2", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Conectadmos ao banco");
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`);
}

export default sequelize;
