import app from './app';
import { conectarMongo } from './config/mongo'; 

const PORT = 3001; 
conectarMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ MongoDB conectado com sucesso!`);
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("❌ Falha na conexão com o banco:", err);
});