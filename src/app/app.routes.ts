import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Listado } from './pages/listado/listado';
import { Detalle } from './pages/detalle/detalle';
import { MisReservas } from './pages/mis-reservas/mis-reservas';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'alojamientos', component: Listado },
  { path: 'alojamientos/:id', component: Detalle },
  { path: 'mis-reservas', component: MisReservas },
  { path: '**', redirectTo: '' },
];
