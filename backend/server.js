require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const cors = require('cors');
const orderPaymentRoutes = require('./routes/orderPaymentRoutes');
const productRoutes = require('./routes/productRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const {
  errorPagesHandler,
  pageNotFound,
} = require('./middleware/errorHandler');
const rateLimiter = require('./utils/ratelimit');
const corsOptions = require('./utils/corsOption');
const PORT = process.env.PORT;

const app = express();
app.use(helmet());
app.use(rateLimiter);
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); 
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userAuthRoutes);
app.use('/api/orders', orderPaymentRoutes);

app.use(errorPagesHandler);
app.use(pageNotFound);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port 5050');
    });
  })
  .catch((error) => {
    console.error('Failed to start server due to DB connection error:', error);
  });
