import { Injectable } from '@angular/core';
import { Alojamiento } from '../models/alojamiento';
import { Cotizacion } from '../models/cotizacion';

export interface ResultadoCotizacion {
  cotizacion: Cotizacion | null;
  errores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CotizacionService {
  private readonly PORCENTAJE_SERVICIO = 0.1;
  private readonly MS_POR_DIA = 1000 * 60 * 60 * 24;

  // Convierte "2026-10-15" en una fecha local (sin problemas de zona horaria)
  private aFecha(valor: string): Date {
    const [anio, mes, dia] = valor.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }

  calcular(
    alojamiento: Alojamiento,
    fechaLlegada: string,
    fechaSalida: string,
    huespedes: number,
  ): ResultadoCotizacion {
    const errores: string[] = [];

    if (!fechaLlegada || !fechaSalida) {
      errores.push('Debes seleccionar la fecha de llegada y la fecha de salida.');
      return { cotizacion: null, errores };
    }

    const llegada = this.aFecha(fechaLlegada);
    const salida = this.aFecha(fechaSalida);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (llegada < hoy) {
      errores.push('La fecha de llegada no puede ser anterior a la fecha actual.');
    }
    if (salida <= llegada) {
      errores.push('La fecha de salida debe ser posterior a la fecha de llegada.');
    }
    if (!huespedes || huespedes <= 0) {
      errores.push('El número de huéspedes debe ser mayor que cero.');
    }
    if (huespedes > alojamiento.capacidad) {
      errores.push(
        `El número de huéspedes no puede superar la capacidad (${alojamiento.capacidad}).`,
      );
    }
    if (alojamiento.precioNoche <= 0) {
      errores.push('El precio por noche debe ser mayor que cero.');
    }

    if (errores.length > 0) {
      return { cotizacion: null, errores };
    }

    const noches = Math.round((salida.getTime() - llegada.getTime()) / this.MS_POR_DIA);
    const subtotal = noches * alojamiento.precioNoche;
    const tarifaLimpieza = alojamiento.tarifaLimpieza;
    const tarifaServicio = subtotal * this.PORCENTAJE_SERVICIO;
    const total = subtotal + tarifaLimpieza + tarifaServicio;

    return {
      cotizacion: {
        alojamientoId: alojamiento.id,
        fechaLlegada,
        fechaSalida,
        huespedes,
        noches,
        precioNoche: alojamiento.precioNoche,
        subtotal,
        tarifaLimpieza,
        tarifaServicio,
        total,
      },
      errores: [],
    };
  }
}
