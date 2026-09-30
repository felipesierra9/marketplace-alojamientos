import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Alojamiento, MarketplaceData } from '../models/alojamiento';
import { Resena } from '../models/resena';

@Injectable({
  providedIn: 'root',
})
export class AlojamientoService {
  private http = inject(HttpClient);
  private readonly url = 'assets/data/marketplace-data.json';

  private obtenerDatos(): Observable<MarketplaceData> {
    return this.http.get<MarketplaceData>(this.url);
  }

  // Solo alojamientos activos (regla de negocio)
  getAlojamientos(): Observable<Alojamiento[]> {
    return this.obtenerDatos().pipe(map((datos) => datos.alojamientos.filter((a) => a.activo)));
  }

  getAlojamientoPorId(id: number): Observable<Alojamiento | undefined> {
    return this.getAlojamientos().pipe(map((lista) => lista.find((a) => a.id === id)));
  }

  getResenasPorAlojamiento(id: number): Observable<Resena[]> {
    return this.obtenerDatos().pipe(
      map((datos) => datos.resenas.filter((r) => r.alojamientoId === id)),
    );
  }
}
