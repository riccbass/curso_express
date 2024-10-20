import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("conectado com sucesso");
} catch (err) {
  console.log("Não foi possível conectar: ", err);
}

export default sequelize;
