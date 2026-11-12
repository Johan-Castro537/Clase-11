import { pool } from '../config/database.js';

export async function findAll() {
  const [rows] = await pool.execute(
    `SELECT id_detalle AS id,
            id_venta AS ventaId,
            id_producto AS productoId,
            cantidad,
            precio_unitario AS precioUnitario
     FROM detalle_venta
     ORDER BY id_detalle`,
  );
  return rows.map((row) => ({
    ...row,
    cantidad: Number(row.cantidad),
    precioUnitario: Number(row.precioUnitario),
  }));
}
