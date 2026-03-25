const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin'], // Allowed headers
};
module.exports = corsOptions;