require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { connectDB } = require('./config/db');
const cors = require('cors');
const orderPaymentRoutes = require('./routes/orderPaymentRoutes');
const productRoutes = require('./routes/productRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const {
  errorPagesHandler,
  pageNotFound,
} = require('./middleware/errorHandler');
const PORT = process.env.PORT;

const app = express();
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(cors());
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
