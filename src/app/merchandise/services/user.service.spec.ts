import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importa HttpTestingController
import { UserService } from './user.service';
import { UserReponse } from 'src/app/interfaces/user-response-interface';
import { environment } from 'src/environments/environment.prod';

export const BASE_URl = environment.URL_API;


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API via GET', () => {
    const dummyUsers: UserReponse[] = [
      { id: 1, name: 'John', age: 30, position: { idPosition: 1, jobTitle: 'Developer' }, joinDate: new Date('2023-01-01') },
      { id: 2, name: 'Doe', age: 40, position: { idPosition: 2, jobTitle: 'Manager' }, joinDate: new Date('2023-02-01') }
    ];


    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(`${BASE_URl}/user`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });
});
