import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EdBy } from 'src/app/interfaces/merchandise-response-interface';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
})
export class DialogDeleteComponent {
  users: EdBy[] = [];
  registeredBy: EdBy | null = null;
  selectedUser: number | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogDeleteComponent>
  ) {
    this.users = data.users;
    this.registeredBy = data.registeredBy;
    this.selectedUser = this.registeredBy?.id ?? null;
  }

  onConfirm(): void {
    this.data.onConfirm(this.selectedUser);
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
