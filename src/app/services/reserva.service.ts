import { Injectable } from '@angular/core';
import { Alojamiento } from '../models/alojamiento';
import { Cotizacion } from '../models/cotizacion';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly CLAVE = 'reservas';
  private reservas: Reserva[] = [];

  constructor() {
    this.cargar();
  }

  private cargar(): void {
    try {
      const guardado = localStorage.getItem(this.CLAVE);
      this.reservas = guardado ? JSON.parse(guardado) : [];
    } catch {
      this.reservas = [];
    }
  }

  private guardar(): void {
    try {
      localStorage.setItem(this.CLAVE, JSON.stringify(this.reservas));
    } catch {
      // Si localStorage no está disponible, las reservas quedan solo en memoria
    }
  }

  // Una reserva solo se crea a partir de una cotización válida
  crear(
    alojamiento: Alojamiento,
    cotizacion: Cotizacion,
    nombreHuesped: string,
    correo: string,
  ): Reserva {
    const reserva: Reserva = {
      id: 'RES-' + Date.now(),
      alojamientoId: alojamiento.id,
      nombreAlojamiento: alojamiento.nombre,
      ciudad: alojamiento.ciudad,
      fechaLlegada: cotizacion.fechaLlegada,
      fechaSalida: cotizacion.fechaSalida,
      huespedes: cotizacion.huespedes,
      noches: cotizacion.noches,
      total: cotizacion.total,
      nombreHuesped: nombreHuesped.trim(),
      correo: correo.trim(),
      estado: 'CONFIRMADA',
    };

    this.reservas.push(reserva);
    this.guardar();
    return reserva;
  }

  getReservas(): Reserva[] {
    return [...this.reservas];
  }
  cancelar(id: string): void {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva) {
      reserva.estado = 'CANCELADA';
      this.guardar();
    }
  }

  eliminar(id: string): void {
    this.reservas = this.reservas.filter(r => r.id !== id);
    this.guardar();
  }
}
