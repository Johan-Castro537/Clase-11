import { Router } from 'express';
import { listSaleDetails } from '../controllers/detalle-venta.controller.js';

const router = Router();
router.get('/', listSaleDetails);

export default router;
