const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

module.exports = app;