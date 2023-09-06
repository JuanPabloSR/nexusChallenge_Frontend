import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MerchandiseService } from './merchandise.service';
import { Content, MerchandiseReponse } from 'src/app/interfaces/merchandise-response-interface';
import { environment } from 'src/environments/environment.prod';
import { MerchandiseEdit } from 'src/app/interfaces/merchandise-create-interface';

const BASE_URL = environment.URL_API;

describe('MerchandiseService', () => {
  let service: MerchandiseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MerchandiseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve merchandise from the API via GET', () => {
    const dummyMerchandise: MerchandiseReponse = {
      content: [
        { id: 1, productName: 'Product 1', quantity: 10, entryDate: new Date('2023-01-01'), registeredBy: { id: 1, name: 'John' } },
        { id: 2, productName: 'Product 2', quantity: 20, entryDate: new Date('2023-02-01'), registeredBy: { id: 2, name: 'Doe' } }
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: { sorted: true, unsorted: false, empty: false },
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: true,
      totalPages: 1,
      totalElements: 2,
      size: 10,
      number: 0,
      sort: { sorted: true, unsorted: false, empty:false },
      first:true,
      numberOfElements :2,
      empty:false
    };

    service.getMerchandise({ page :0 , size :10 , keyword :'Product' , entryDate :null}).subscribe(merchandise => {
      expect(merchandise.content!.length).toBe(2);
      expect(merchandise).toEqual(dummyMerchandise);
    });

    const request = httpMock.expectOne(`${BASE_URL}/merchandise?size=10&page=0&searchTerm=Product`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMerchandise);
  });



  it('should retrieve merchandise by id from the API via GET', () => {
    const dummyMerchandise: Content = { id: 1, productName: 'Product 1', quantity: 10, entryDate: new Date('2023-01-01'), registeredBy: { id: 1, name: 'John' } };

    service.getMerchandiseId(1).subscribe(merchandise => {
      expect(merchandise).toEqual(dummyMerchandise);
    });

    const request = httpMock.expectOne(`${BASE_URL}/merchandise/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMerchandise);
  });


  it('should create merchandise via POST', () => {
    const dummyMerchandise: Content = { id: 1, productName: 'Product 1', quantity: 10, entryDate: new Date('2023-01-01'), registeredBy: { id: 1, name: 'John' } };

    service.createMerchandise(dummyMerchandise).subscribe(merchandise => {
      expect(merchandise).toEqual(dummyMerchandise);
    });

    const request = httpMock.expectOne(`${BASE_URL}/merchandise`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyMerchandise);
  });

  it('should update merchandise via PUT', () => {
    const dummyMerchandise: MerchandiseEdit = { id: 1, productName: 'Updated Product', quantity: 20, entryDate: new Date('2023-02-01'), editedById: 2 };

    service.updateMerchandise(1, dummyMerchandise).subscribe(merchandise => {
      expect(merchandise).toEqual(dummyMerchandise);
    });

    const request = httpMock.expectOne(`${BASE_URL}/merchandise/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyMerchandise);
  });

  it('should delete merchandise via DELETE', () => {
    service.deleteMerchandise(1, 1).subscribe(status => {
      expect(status).toBe(204);
    });

    const request = httpMock.expectOne(`${BASE_URL}/merchandise/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null, { status: 204, statusText: 'No Content' });
  });

});
