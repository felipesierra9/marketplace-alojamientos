import { Component, inject, input, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Alojamiento } from '../../models/alojamiento';
import { Cotizacion } from '../../models/cotizacion';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-formulario-reserva',
  imports: [FormsModule],
  templateUrl: './formulario-reserva.html',
  styleUrl: './formulario-reserva.css',
})
export class FormularioReserva {
  private reservaService = inject(ReservaService);

  alojamiento = input.required<Alojamiento>();
  cotizacion = input.required<Cotizacion>();

  reservaCreada = output<Reserva>();
  cancelar = output<void>();

  nombre = '';
  correo = '';

  confirmar(formulario: NgForm): void {
    if (formulario.invalid) {
      return;
    }
    const reserva = this.reservaService.crear(
      this.alojamiento(),
      this.cotizacion(),
      this.nombre,
      this.correo,
    );
    this.reservaCreada.emit(reserva);
  }
}
