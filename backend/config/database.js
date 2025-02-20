const { Sequelize } = require('sequelize');
const { Pool } = require('pg')

const DATABASE_URL  = process.env.DATABASE_URL

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: Pool,
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
