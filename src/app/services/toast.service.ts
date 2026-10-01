import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  mensaje: string;
  tipo: 'exito' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private contador = 0;
  toasts = signal<Toast[]>([]);

  mostrar(mensaje: string, tipo: Toast['tipo'] = 'info'): void {
    const toast: Toast = { id: ++this.contador, mensaje, tipo };
    this.toasts.update((lista) => [...lista, toast]);
    setTimeout(() => this.cerrar(toast.id), 3500);
  }

  cerrar(id: number): void {
    this.toasts.update((lista) => lista.filter((t) => t.id !== id));
  }
}
