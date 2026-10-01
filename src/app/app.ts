import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Toasts } from './components/toasts/toasts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toasts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
