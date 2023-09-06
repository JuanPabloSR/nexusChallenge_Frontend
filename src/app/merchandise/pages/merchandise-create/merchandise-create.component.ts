import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchandiseService } from '../../services/merchandise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserReponse } from 'src/app/interfaces/user-response-interface';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-merchandise-create',
  templateUrl: './merchandise-create.component.html',
  styleUrls: ['./merchandise-create.component.css']
})
export class MerchandiseCreateComponent implements OnInit {
  merchandiseForm!: FormGroup;
  isUpdating: boolean = false;
  users: UserReponse[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private merchandiseService: MerchandiseService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initializeForm();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isUpdating = true;
      }
    });
  }

  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: UserReponse[]) => {
        this.users = users;

        console.log(this.users)

      },
      (error) => {
        console.log('Error retrieving users:', error);
      }
    );
  }

  initializeForm(): void {
    this.merchandiseForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      entryDate: ['', Validators.required],
      registeredById: [null, Validators.required]
      // Add more fields as needed
    });
  }

  isFieldInvalid(fieldName: string) {
    const field = this.merchandiseForm.get(fieldName);
    return field?.invalid && field?.touched;
  }

  onSubmit(): void {
    if (this.merchandiseForm.valid) {
      if (this.isUpdating) {
        // Handle updating merchandise
      } else {
        this.createMerchandise();
      }
    }
  }

  createMerchandise(): void {
    const merchandiseData = this.merchandiseForm.value;
    merchandiseData.productName = merchandiseData.productName.trim().replace(/\s+/g, ' ');
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
          this.showSnackBar('The merchandise ' + merchandiseData.productName + ' already exists');
        } else {
          this.showSnackBar(response.message || 'Error creating merchandise');
        }
      },
      (error) => {
        if (error.error.message === 'The merchandise ' + merchandiseData.productName + ' already exists') {
          this.showSnackBar('The merchandise ' + merchandiseData.productName + ' already exists');
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
