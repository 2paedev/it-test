import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DatesService } from 'src/app/shared/services/dates.service';

describe('DatesService', () => {
  let service: DatesService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(DatesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should format date correctly', () => {
    const dateToFormat = new Date(1995, 11, 17);
    const dateFormatted = service.formatDate(dateToFormat);
    expect(dateFormatted).toEqual('17/12/1995');
  });
});
