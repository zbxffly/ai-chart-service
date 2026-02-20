const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS配置
const corsOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3001', 'https://ai-chart-service.vercel.app', 'https://ai-chart-service.onrender.com'];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
