import { Router } from 'express';
import * as voluntarioController from '../controllers/voluntarioController';

const router = Router();

// Define os caminhos da API chamando as funções diretamente
router.post('/', voluntarioController.criar); 
router.get('/', voluntarioController.listar); 

export default router;