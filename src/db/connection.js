import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config() 
const { PGPORT, PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: PGHOST,
  dialect: "postgres",
});

export const testDB = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("DB is authenticated");
    await sequelize.sync().then(() => console.log("The server is connected to postgres"))
    console.log("DB is established");
  } catch (error) {
    console.log("Failed to authenticate", error);
  }
};

export default sequelize;