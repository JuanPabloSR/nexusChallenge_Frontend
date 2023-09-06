import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Content } from 'src/app/interfaces/merchandise-response-interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterOptions } from 'src/app/interfaces/filter-options-interface';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MerchandiseService } from '../../services/merchandise.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-merchandise-list',
  templateUrl: './merchandise-list.component.html',
})
export class MerchandiseListComponent implements AfterViewInit, OnInit {
  merchandiseDataSource: MatTableDataSource<Content> =
    new MatTableDataSource<Content>();
  displayedColumns: string[] = [
    'id',
    'productName',
    'quantity',
    'entryDate',
    'registeredBy',
    'details',
  ];
  pageSizeOptions: number[] = [5, 10, 25, 50];
  totalMerchandise: number = 0;
  searchControl: FormControl = new FormControl();
  isLoading: boolean = false;
  errorRequest: string | null = null;
  maxDate: Date;

  filterOptions: FilterOptions = {
    page: 0,
    size: 10,
    keyword: '',
    entryDate: '',
  };

  entryDateControl: FormControl = new FormControl(null);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private merchandiseService: MerchandiseService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    // Observa cambios en el control de búsqueda para aplicar el filtro.
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        // Restablece la página al cambiar el filtro.
        this.filterOptions.page = 0;
        this.applyFilter();
      });
    // Carga la mercancía al inicializar el componente.
    this.loadMerchandise();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    // Asigna el ordenamiento a la fuente de datos.
    this.merchandiseDataSource.sort = this.sort;

    // Personaliza el acceso a los datos para el ordenamiento.
    this.merchandiseDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'registeredBy':
          return item.registeredBy.name;
        default:
          return item[property];
      }
    };
  }

  loadMerchandise() {
    this.isLoading = true;
    this.merchandiseService.getMerchandise(this.filterOptions).subscribe(
      (response: any) => {
        this.merchandiseDataSource.data = response.content;
        this.totalMerchandise = response.totalElements;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.merchandiseDataSource.data = [];
        this.errorRequest = 'Error in the search';
        this.snackBar.open(this.errorRequest, 'Close', {
          panelClass: ['snackbar-custom'],
          duration: 2000,
        });
      }
    );
  }

  // Personaliza el acceso a los datos para el ordenamiento.
  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex;
    this.filterOptions.page = event.pageIndex;
    this.filterOptions.size = event.pageSize;
    this.loadMerchandise();
  }

  // Anuncia el cambio en el ordenamiento a través de LiveAnnouncer.
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Maneja el cambio en la fecha de entrada.
  onDateChange() {
    const formattedDate = this.datePipe.transform(
      this.entryDateControl.value,
      'yyyy-MM-dd'
    );
    this.filterOptions.entryDate = formattedDate;
    this.loadMerchandise();
  }

  // Aplica el filtro de búsqueda.
  applyFilter() {
    const filterValue = this.searchControl.value.trim().toLowerCase();
    this.filterOptions.keyword = filterValue;
    this.loadMerchandise();
  }
  // Limpia el campo de búsqueda.
  clearSearch() {
    this.searchControl.setValue('');
  }
}
