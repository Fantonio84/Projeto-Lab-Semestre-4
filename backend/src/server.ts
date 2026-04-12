import app from './app';
import { conectarMongo } from './config/mongo'; 

const PORT = 5000;

conectarMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
});