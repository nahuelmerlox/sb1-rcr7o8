import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-uri',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};