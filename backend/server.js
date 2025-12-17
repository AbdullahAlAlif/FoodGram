// Start Server
require('dotenv').config();// Load environment variables as early as possible so modules that =>initialize at require-time (like the storage service) can access them.
const app = require('./src/app');
const connectDB = require('./src/db/db');
connectDB();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});