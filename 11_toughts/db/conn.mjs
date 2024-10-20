import { Sequelize } from "sequelize";

const sequelize = new Sequelize("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("conectamos com sucesso");
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`);
}

export default sequelize;
