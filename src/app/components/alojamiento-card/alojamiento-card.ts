import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Alojamiento } from '../../models/alojamiento';

@Component({
  selector: 'app-alojamiento-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './alojamiento-card.html',
  styleUrl: './alojamiento-card.css',
})
export class AlojamientoCard {
  alojamiento = input.required<Alojamiento>();
}
