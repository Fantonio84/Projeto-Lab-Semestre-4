import express from 'express';
import cors from 'cors';
import voluntarioRoutes from './routes/voluntarioRoutes';
import estatisticasRoutes from './routes/estatisticaRoutes';

const app = express();

// Middlewares PRIMEIRO
app.use(cors());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Log
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Rotas POR ÚLTIMO
app.use('/api/estatisticas', estatisticasRoutes);
app.use('/api/voluntarios', voluntarioRoutes);

export default app;