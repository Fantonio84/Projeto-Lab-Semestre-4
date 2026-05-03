import { Router } from 'express';
import { getEstatisticas } from '../controllers/estatisticasController';

const router = Router();

router.get('/', getEstatisticas);

export default router;