import express from 'express';
import cors from 'cors';
import voluntarioRoutes from './routes/voluntarioRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// conexão com as rotas 
app.use('/api/voluntarios', voluntarioRoutes);

export default app;