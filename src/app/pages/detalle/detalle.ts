import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AlojamientoService } from '../../services/alojamiento.service';
import { Alojamiento } from '../../models/alojamiento';
import { Resena } from '../../models/resena';
import { FormularioCotizacion } from '../../components/formulario-cotizacion/formulario-cotizacion';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, CurrencyPipe, FormularioCotizacion],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {
  private ruta = inject(ActivatedRoute);
  private servicio = inject(AlojamientoService);

  alojamiento = signal<Alojamiento | undefined>(undefined);
  resenas = signal<Resena[]>([]);
  cargando = signal(true);
  imagenActual = signal('');

  constructor() {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.servicio.getAlojamientoPorId(id).subscribe((a) => {
      this.alojamiento.set(a);
      if (a) {
        this.imagenActual.set(a.imagenPrincipal);
      }
      this.cargando.set(false);
    });

    this.servicio.getResenasPorAlojamiento(id).subscribe((r) => this.resenas.set(r));
  }
}
