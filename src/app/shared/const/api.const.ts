import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const API = {
  AUTH: {
    LOGIN: `${environment.apiUrl}/auth/login`,
  },
  USER: {
    BASE: `${environment.apiUrl}/user`,
    BY_ID: (userId: number): string => `${environment.apiUrl}/user/${userId}`,
  },
};

export const CustomHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
