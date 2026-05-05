import { Request, Response } from 'express';
import Voluntario from '../models/Voluntario';

export const criar = async (req: Request, res: Response) => {
  try {
    const novoVoluntario = new Voluntario({
      ...req.body,
      email: req.body.email?.toLowerCase().trim()
    });

    await novoVoluntario.save();

    res.status(201).json({ 
      mensagem: 'Voluntário cadastrado com sucesso!', 
      voluntario: novoVoluntario 
    });

  } catch (error: any) {
    console.error("Erro ao criar voluntário:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        erro: "Este email já está cadastrado."
      });
    }

    res.status(500).json({ 
      erro: 'Erro interno ao cadastrar o voluntário.' 
    });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const voluntarios = await Voluntario.find();
    res.status(200).json(voluntarios);
  } catch (error) {
    console.error("Erro ao listar voluntários:", error);
    res.status(500).json({ erro: 'Erro interno ao buscar os voluntários.' });
  }
};