import * as detailRepository from '../repositories/detalle-venta.repository.js';
import { sendSuccess } from '../utils/api-response.js';

export async function listSaleDetails(_request, response, next) {
  try {
    return sendSuccess(response, await detailRepository.findAll());
  } catch (error) {
    return next(error);
  }
}
