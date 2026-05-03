import { Request, Response } from 'express';
import pool from '../config/myslq';
export const getEstatisticas = async (req: Request, res: Response) => {
  console.log('--- [BACKEND] Nova requisição de estatísticas recebida ---');

  try {
    // Busca Atendimentos
    console.log('SQL: Buscando contagem em "atendimento"...');
    const [[atendimentos]] = await pool.query('SELECT COUNT(*) as total FROM atendimento') as any;
    console.log(`> Resultado Atendimentos: ${atendimentos?.total || 0}`);

    // Busca Dentistas
    console.log('SQL: Buscando contagem em "dentista"...');
    const [[dentistas]] = await pool.query('SELECT COUNT(*) as total FROM dentista') as any;
    console.log(`> Resultado Dentistas: ${dentistas?.total || 0}`);

    // Busca Crianças
    console.log('SQL: Buscando contagem em "crianca"...');
    const [[criancas]] = await pool.query('SELECT COUNT(*) as total FROM crianca') as any;
    console.log(`> Resultado Crianças: ${criancas?.total || 0}`);

    const payloadResponse = {
      atendimentos: atendimentos.total,
      dentistas: dentistas.total,
      criancas: criancas.total,
    };

    console.log('--- [BACKEND] Enviando dados para o Front-end ---');
    console.table(payloadResponse); // Formata os dados em uma tabela no terminal

    res.status(200).json(payloadResponse);
    
  } catch (error: any) {
    console.error('!!! [ERRO NO MYSQL] !!!');
    console.error('Mensagem:', error.message);
    console.error('Código do Erro:', error.code);
    
    res.status(500).json({ 
      erro: 'Erro ao buscar estatísticas do MySQL.',
      detalhes: error.message 
    });
  }
};