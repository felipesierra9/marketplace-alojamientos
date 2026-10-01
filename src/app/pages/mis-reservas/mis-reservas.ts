import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-mis-reservas',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas {
  private reservaService = inject(ReservaService);

  reservas = signal<Reserva[]>([]);
  pendiente = signal<{ id: string; tipo: 'cancelar' | 'eliminar' } | null>(null);

  constructor() {
    this.refrescar();
  }

  private refrescar(): void {
    this.reservas.set(this.reservaService.getReservas().reverse());
  }

  pedirConfirmacion(id: string, tipo: 'cancelar' | 'eliminar'): void {
    this.pendiente.set({ id, tipo });
  }

  descartar(): void {
    this.pendiente.set(null);
  }

  confirmar(): void {
    const accion = this.pendiente();
    if (!accion) {
      return;
    }
    if (accion.tipo === 'cancelar') {
      this.reservaService.cancelar(accion.id);
    } else {
      this.reservaService.eliminar(accion.id);
    }
    this.pendiente.set(null);
    this.refrescar();
  }
}
