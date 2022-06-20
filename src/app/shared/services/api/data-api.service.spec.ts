import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataApiService } from 'src/app/shared/services/api/data-api.service';
import { mockSalesArray } from 'src/mocks/sales-mocks';

describe('DataApiService', () => {
  let service: DataApiService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(DataApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getSales and return an array of Sales', () => {
    service.getSales().subscribe((res) => {
      expect(res).toEqual(mockSalesArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: 'assets/data/sales.json',
    });

    req.flush(mockSalesArray);
  });
});
