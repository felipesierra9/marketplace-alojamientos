export interface Reserva {
  id: string;
  alojamientoId: number;
  nombreAlojamiento: string;
  ciudad: string;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  nombreHuesped: string;
  correo: string;
  estado: 'CONFIRMADA' | 'CANCELADA';
}
