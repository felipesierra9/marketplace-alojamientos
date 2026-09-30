import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlojamientoService } from '../../services/alojamiento.service';
import { Alojamiento } from '../../models/alojamiento';
import { AlojamientoCard } from '../../components/alojamiento-card/alojamiento-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AlojamientoCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private servicio = inject(AlojamientoService);

  destacados = signal<Alojamiento[]>([]);

  constructor() {
    this.servicio.getAlojamientos().subscribe((lista) => {
      const mejores = [...lista].sort((a, b) => b.calificacion - a.calificacion).slice(0, 3);
      this.destacados.set(mejores);
    });
  }
}
