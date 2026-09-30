import { Component, inject } from '@angular/core';
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

  reservas: Reserva[] = this.reservaService.getReservas().reverse();
}
