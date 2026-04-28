import mongoose from 'mongoose';

export const conectarMongo = async () => {
  try {
    // String de conexão com o banco local. 
    const url = 'mongodb://127.0.0.1:27017/acessos_sistema_odonto';
    
    await mongoose.connect(url);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};