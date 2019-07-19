require('dotenv').config();

module.exports = {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  port: process.env.DBPORT,
  username: process.env.USR,
  password: process.env.PWD,
  database: process.env.DB,
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
