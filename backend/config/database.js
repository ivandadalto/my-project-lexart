const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = { sequelize };
