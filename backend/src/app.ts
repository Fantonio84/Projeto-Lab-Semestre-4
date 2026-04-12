import express from 'express';
import cors from 'cors';
import voluntarioRoutes from './routes/voluntarioRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Aqui você conecta a rota que criamos acima
app.use('/api/voluntarios', voluntarioRoutes);

export default app;