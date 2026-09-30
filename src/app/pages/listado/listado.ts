import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlojamientoService } from '../../services/alojamiento.service';
import { Alojamiento } from '../../models/alojamiento';
import { AlojamientoCard } from '../../components/alojamiento-card/alojamiento-card';

@Component({
  selector: 'app-listado',
  imports: [FormsModule, AlojamientoCard],
  templateUrl: './listado.html',
  styleUrl: './listado.css',
})
export class Listado {
  private servicio = inject(AlojamientoService);

  alojamientos = signal<Alojamiento[]>([]);
  ciudad = signal('');
  tipo = signal('');
  huespedes = signal<number | null>(null);
  precioMax = signal<number | null>(null);

  ciudades = computed(() => [...new Set(this.alojamientos().map((a) => a.ciudad))]);
  tipos = computed(() => [...new Set(this.alojamientos().map((a) => a.tipo))]);

  filtrados = computed(() =>
    this.alojamientos().filter(
      (a) =>
        (!this.ciudad() || a.ciudad === this.ciudad()) &&
        (!this.tipo() || a.tipo === this.tipo()) &&
        (!this.huespedes() || a.capacidad >= this.huespedes()!) &&
        (!this.precioMax() || a.precioNoche <= this.precioMax()!),
    ),
  );

  constructor() {
    this.servicio.getAlojamientos().subscribe((lista) => this.alojamientos.set(lista));
  }

  limpiarFiltros(): void {
    this.ciudad.set('');
    this.tipo.set('');
    this.huespedes.set(null);
    this.precioMax.set(null);
  }
}
