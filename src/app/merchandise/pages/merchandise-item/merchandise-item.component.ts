import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/interfaces/merchandise-response-interface';
import { MerchandiseService } from '../../services/merchandise.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { UserReponse } from 'src/app/interfaces/user-response-interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-merchandise-item',
  templateUrl: './merchandise-item.component.html',
  styleUrls: ['./merchandise-item.component.css'],
  providers: [MatDialog]

})
export class MerchandiseItemComponent implements OnInit {
  isLoading: boolean = false;
  merchandise: Content | null = null;
  merchandiseId: number = 0;
  errorRequest: string | null = null;
  users: UserReponse[] = [];
  selectedUser: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private merchandiseService: MerchandiseService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,


  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.merchandiseId = +params['id'];
      this.loadMerchandise();
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadMerchandise() {
    this.isLoading = true;
    this.merchandiseService.getMerchandiseId(this.merchandiseId).subscribe(
      (response) => {
        this.merchandise = response;
        this.isLoading = false;
      },
      (error) => {
        this.errorRequest = 'Error Request merchandise not exist';
        this.snackBar.open(this.errorRequest, 'Close', {
          duration: 2000,
        });
      }
    )
  }

  onConfirmDelete(): void {
    this.merchandiseService.deleteMerchandise(this.merchandiseId, this.selectedUser!).subscribe(
      () => {

      },
      (error) => {

        if (error.status === 403) {
          this.snackBar.open('You are not authorized to dispose of this merchandise', 'Cerrar', {
            duration: 2000,
          });
        } else if(error.status === 404) {
          this.snackBar.open('An error occurred while deleting the merchandise', 'Cerrar', {
            duration: 2000,
          });
        } else {
          this.snackBar.open('Merchandise was disposed of correctly', 'Cerrar', {
            duration: 2000,
          });
          this.router.navigate(['/merchandise/list']);
        }
      }
    );
  }


  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        users: this.users,
        onConfirm: (selectedUser: number) => {
          this.selectedUser = selectedUser;
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onConfirmDelete();
      }
    });
  }



}
