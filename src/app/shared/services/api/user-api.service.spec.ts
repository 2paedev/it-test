import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserApiService } from 'src/app/shared/services/api/user-api.service';
import { mockUser } from 'src/mocks/users-mocks';
import { API } from '../../const/api.const';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(UserApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getBookById and return the appropriate Book', () => {
    const id = 1;
    service.getById(id).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: API.USER.BY_ID(id),
    });

    req.flush(mockUser);
  });
});
