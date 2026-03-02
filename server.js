require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
const orderPaymentRoutes = require('./routes/orderPaymentRoutes');
const productRoutes = require('./routes/productRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userAuthRoutes);
app.use('/api/orders', orderPaymentRoutes);

app.use(errorHandler.errorPagesHandler);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port 5050');
    });
  })
  .catch((error) => {
    console.error('Failed to start server due to DB connection error:', error);
  });
