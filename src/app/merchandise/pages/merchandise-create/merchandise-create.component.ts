import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchandiseService } from '../../services/merchandise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserReponse } from 'src/app/interfaces/user-response-interface';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { MerchandiseEdit } from 'src/app/interfaces/merchandise-create-interface';
import { Content, EdBy, MerchandiseReponse } from 'src/app/interfaces/merchandise-response-interface';

@Component({
  selector: 'app-merchandise-create',
  templateUrl: './merchandise-create.component.html',
  styleUrls: ['./merchandise-create.component.css'],
})
export class MerchandiseCreateComponent implements OnInit {
  merchandiseForm!: FormGroup;
  merchandiseId!: number;
  isUpdating: boolean = false;
  users: UserReponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private merchandiseService: MerchandiseService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.merchandiseId = +params['id'];
        this.isUpdating = true;
        this.loadMerchandiseData();
      }
      this.initializeForm();
    });
  }


  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: UserReponse[]) => {
        this.users = users;
      },
      (error) => {
        console.log('Error retrieving users:', error);
      }
    );
  }

  loadMerchandiseData(): void {
    this.merchandiseService.getMerchandiseId(this.merchandiseId).subscribe(
      (merchandise: Content) => {
        this.merchandiseForm.patchValue(merchandise);
        this.merchandiseForm.get('editedById')?.setValue(merchandise.editedBy?.id);
        console.log(merchandise.editedBy?.name);
      },
      (error) => {
        console.log('Error retrieving merchandise:', error);
      }
    );
  }



  initializeForm(): void {
    this.merchandiseForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      entryDate: ['', Validators.required],
      registeredById: [null, this.isUpdating ? null : Validators.required],
      editedById: [null],
    });
  }

  isFieldInvalid(fieldName: string) {
    const field = this.merchandiseForm.get(fieldName);
    return field?.invalid && field?.touched;
  }

  onSubmit(): void {
    if (this.merchandiseForm.valid) {
      if (this.isUpdating) {
        this.updateMerchandise();
      } else {
        this.createMerchandise();
      }
    }
  }

  updateMerchandise(): void {
    const merchandiseUp: MerchandiseEdit = this.merchandiseForm.value;
    merchandiseUp.id = this.merchandiseId;
    merchandiseUp.editedById = this.merchandiseForm.get('editedById')?.value;

    this.merchandiseService
      .updateMerchandise(this.merchandiseId, merchandiseUp)
      .subscribe(
        (response: any[]) => {
          this.showSnackBar('Subscriber updated successfully');
          this.navigateToMerchandiseList();
        },
        () => {
          this.showSnackBar('Error updating subscriber');
        }
      );
  }

  createMerchandise(): void {
    const merchandiseData = this.merchandiseForm.value;
    merchandiseData.productName = merchandiseData.productName
      .trim()
      .replace(/\s+/g, ' ');
    const registeredByIdControl = this.merchandiseForm.get('registeredById');
    if (registeredByIdControl) {
      merchandiseData.registeredById = registeredByIdControl.value;
    }

    this.merchandiseService.createMerchandise(merchandiseData).subscribe(
      (response: any) => {
        if (response.id) {
          this.showSnackBar('Merchandise created successfully');
          this.navigateToMerchandiseList();
        } else if (response.status === 'BAD_REQUEST') {
          this.showSnackBar(
            'The merchandise ' + merchandiseData.productName + ' already exists'
          );
        } else {
          this.showSnackBar(response.message || 'Error creating merchandise');
        }
      },
      (error) => {
        if (
          error.error.message ===
          'The merchandise ' + merchandiseData.productName + ' already exists'
        ) {
          this.showSnackBar(
            'The merchandise ' + merchandiseData.productName + ' already exists'
          );
        } else {
          this.showSnackBar('Error creating merchandise');
        }
      }
    );
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }

  navigateToMerchandiseList(): void {
    this.router.navigate(['merchandise/list']);
  }
}
