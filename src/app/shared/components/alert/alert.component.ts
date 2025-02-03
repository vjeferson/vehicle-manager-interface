import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { TranslateModule } from '@ngx-translate/core';

import { AlertOptions } from 'src/app/shared/interfaces/alert-options.interface';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [TranslateModule, MatDialogModule, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertOptions) { }
}
