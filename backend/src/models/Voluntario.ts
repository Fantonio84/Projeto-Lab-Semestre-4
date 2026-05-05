import mongoose, { Schema, Document } from 'mongoose';

// 1. A Interface: Ensina o TypeScript quais dados o Voluntário tem
export interface IVoluntario extends Document {
  nome: string;
  telefone: string;
  email: string;
  curriculo?: {
    dados: string; // String Base64 do arquivo
    tipo: string;  // ex: 'application/pdf'
    nomeArquivo: string;
  };
  
}

// 2. O Schema: Ensina o MongoDB como criar a tabela no banco de dados
const VoluntarioSchema: Schema = new Schema(
  {
    nome: { 
      type: String, 
      required: true 
    },
    telefone: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true,
      unique: true 
    },
   curriculo: {
      dados: String,
      tipo: String,
      nomeArquivo: String
    }
  },
  {
    // Isso cria automaticamente os campos de "Data de Criação" e "Data de Atualização"
    timestamps: true 
  }
);

// 3. Cria o modelo e exporta para o Controller poder usar
const Voluntario = mongoose.model<IVoluntario>('Voluntario', VoluntarioSchema);

export default Voluntario;