import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as packageInfo from '../../package.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly appTitle = 'Info veículos';
  private readonly appInfo = packageInfo;
  
  ngOnInit(): void {
    console.log(`${this.appTitle} Versão: ${this.appInfo.version}`);
  }
}
