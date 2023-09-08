import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchandiseService } from '../../services/merchandise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserReponse } from 'src/app/interfaces/user-response-interface';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { MerchandiseEdit } from 'src/app/interfaces/merchandise-create-interface';
import { Content } from 'src/app/interfaces/merchandise-response-interface';

@Component({
  selector: 'app-merchandise-create',
  templateUrl: './merchandise-create.component.html',
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

  /** Tranforma el date para usarla en el filtro del calendario */
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  /** Carga la lista de usuarios */
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users: UserReponse[]) => {
        this.users = users;
      },
      (error) => {
        this.snackBar.open('Error retrieving users', 'Close', {
          panelClass: ['snackbar-custom'],
          duration: 2000,
        });
      }
    );
  }

  /** Carga los datos de la mercancía si se está actualizando */
  loadMerchandiseData(): void {
    this.merchandiseService.getMerchandiseId(this.merchandiseId).subscribe(
      (merchandise: Content) => {
        this.merchandiseForm.patchValue(merchandise);
        this.merchandiseForm
          .get('editedById')
          ?.setValue(merchandise.editedBy?.id);
      },
      (error) => {
        this.snackBar.open('Error retrieving merchandise', 'Close', {
          panelClass: ['snackbar-custom'],
          duration: 2000,
        });
      }
    );
  }

  /** Inicializa el formulario de mercancía */
  initializeForm(): void {
    this.merchandiseForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      entryDate: ['', Validators.required],
      registeredById: [null, this.isUpdating ? null : Validators.required],
      editedById: [null, this.isUpdating ? Validators.required : null],
    });
  }

  /** Comprueba si un campo del formulario es inválido */
  isFieldInvalid(fieldName: string) {
    const field = this.merchandiseForm.get(fieldName);
    return field?.invalid && field?.touched;
  }

  /** Envía el formulario de mercancía */
  onSubmit(): void {
    if (this.merchandiseForm.valid) {
      if (this.isUpdating) {
        this.updateMerchandise();
      } else {
        this.createMerchandise();
      }
    }
  }

  /** Actualiza la mercancía */
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

  /** Crea una nueva mercancía */
  createMerchandise(): void {
    const merchandiseData = this.merchandiseForm.value;
    merchandiseData.productName = this.normalizeProductName(
      merchandiseData.productName
    );
    const registeredById = this.merchandiseForm.get('registeredById')?.value;

    this.merchandiseService.createMerchandise(merchandiseData).subscribe(
      (response: any) => {
        if (response.id) {
          this.handleSuccessfulCreation(merchandiseData.productName);
        } else {
          this.handleCreationError(
            response.message || 'Error creating merchandise'
          );
        }
      },
      (error) => {
        if (
          error.error.message ===
          `The merchandise ${merchandiseData.productName} already exists`
        ) {
          this.handleMerchandiseAlreadyExists(merchandiseData.productName);
        } else {
          this.handleCreationError('Error creating merchandise');
        }
      }
    );
  }

  /**
   * Normaliza el nombre del producto eliminando espacios en blanco innecesarios.
   *
   * @param productName El nombre del producto a normalizar.
   * @returns El nombre del producto normalizado.
   */
  private normalizeProductName(productName: string): string {
    return productName.trim().replace(/\s+/g, ' ');
  }

  private handleSuccessfulCreation(productName: string): void {
    this.showSnackBar('Merchandise created successfully');
    this.navigateToMerchandiseList();
  }

  private handleCreationError(errorMessage: string): void {
    this.showSnackBar(errorMessage);
  }

  private handleMerchandiseAlreadyExists(productName: string): void {
    this.showSnackBar(`The merchandise ${productName} already exists`);
  }

  /**
   * Crea la alerta que se mostrara en pantalla cuando se requiera
   * @param message
   */
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      panelClass: ['snackbar-custom'],
      duration: 2000,
    });
  }

  navigateToMerchandiseList(): void {
    this.router.navigate(['merchandise/list']);
  }
}
