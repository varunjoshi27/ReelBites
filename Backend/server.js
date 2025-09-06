// Start Server
require('dotenv').config();
const app = require('./src/App');
const connectDB = require('./src/db/db');

connectDB();

app.listen(3000, () => {
  console.log('Server is Running on Port 3000');
});
