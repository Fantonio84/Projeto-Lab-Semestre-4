import express from 'express';
import cors from 'cors';
import voluntarioRoutes from './routes/voluntarioRoutes';

const app = express();

// O CORS vazio permite qualquer origem, ideal para resolver o erro de trava local
app.use(cors());
app.use(express.json());

// Log para você ver as requisições chegando no terminal
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api/voluntarios', voluntarioRoutes);

export default app;