import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';
import { Cotizacion } from '../../models/cotizacion';
import { Reserva } from '../../models/reserva';
import { CotizacionService } from '../../services/cotizacion.service';
import { FormularioReserva } from '../formulario-reserva/formulario-reserva';

@Component({
  selector: 'app-formulario-cotizacion',
  imports: [FormsModule, CurrencyPipe, RouterLink, FormularioReserva],
  templateUrl: './formulario-cotizacion.html',
  styleUrl: './formulario-cotizacion.css',
})
export class FormularioCotizacion {
  private cotizacionService = inject(CotizacionService);

  alojamiento = input.required<Alojamiento>();

  fechaLlegada = signal('');
  fechaSalida = signal('');
  huespedes = signal(1);

  cotizacion = signal<Cotizacion | null>(null);
  errores = signal<string[]>([]);
  mostrarReserva = signal(false);
  reservaConfirmada = signal<Reserva | null>(null);

  hoy = this.fechaLocal();

  // Fecha de hoy en formato yyyy-mm-dd usando la hora local
  private fechaLocal(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
  }

  // Si el usuario cambia algún dato, la cotización anterior deja de ser válida
  invalidar(): void {
    this.cotizacion.set(null);
    this.errores.set([]);
    this.mostrarReserva.set(false);
  }

  calcular(): void {
    this.mostrarReserva.set(false);
    const resultado = this.cotizacionService.calcular(
      this.alojamiento(),
      this.fechaLlegada(),
      this.fechaSalida(),
      this.huespedes(),
    );
    this.cotizacion.set(resultado.cotizacion);
    this.errores.set(resultado.errores);
  }

  alConfirmarReserva(reserva: Reserva): void {
    this.reservaConfirmada.set(reserva);
    this.mostrarReserva.set(false);
  }

  nuevaCotizacion(): void {
    this.reservaConfirmada.set(null);
    this.fechaLlegada.set('');
    this.fechaSalida.set('');
    this.huespedes.set(1);
    this.invalidar();
  }
}
