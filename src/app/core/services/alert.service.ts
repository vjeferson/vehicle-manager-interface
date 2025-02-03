import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlertOptions } from 'src/app/shared/interfaces';

import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private _dialog: MatDialog) { }

    public open(options: AlertOptions): MatDialogRef<AlertComponent> {
        const dialogRef = this._dialog.open(AlertComponent, {
            data: {
                message: options.message,
                textButtonConfirm: options.textButtonConfirm,
                textButtonCancel: options.textButtonCancel
            },
            disableClose: false,
            hasBackdrop: true,
        });
        return dialogRef;
    }
}
