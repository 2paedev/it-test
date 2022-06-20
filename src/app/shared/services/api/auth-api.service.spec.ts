import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthApiService } from 'src/app/shared/services/api/auth-api.service';
import { mockUser } from 'src/mocks/users-mocks';
import { API } from '../../const/api.const';
import { ILoginParams } from '../../models/auth.model';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(AuthApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call login and return the user logged', () => {
    const bodyParams: ILoginParams = {
      username: 'aUsername',
      password: 'aPassword',
    };

    service.login(bodyParams).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: API.AUTH.LOGIN,
    });

    req.flush(mockUser);
  });
});
