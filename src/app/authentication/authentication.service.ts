import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import CryptoJS from 'crypto-js';
import { environment } from 'environments/environment.dev';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiURL}auth/`;

  constructor(
    private notificationService: OpenModalsService,
    private http: HttpClient
  ) { }

  login(credentials: { username: string; password: string }): Observable<boolean> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers, withCredentials: true };

    const url = `${this.apiUrl}login/`

    return this.http.post<any>(url, credentials, options).pipe(
      map((response) => {
        console.log(response);

        if (response && response.id) {
          const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(response), 'secretKey').toString();
          localStorage.setItem('UserAbrevia', encryptedUser);
          
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        this.notificationService.notificacion('Error', `${error?.error?.error}`, '', 'mat_outline:error')
        console.error('Error during login', error);
        return of(false);
      })
    );
  }

  logout() : Observable<any>  {
    const url = `${this.apiUrl}logout/`;

    return this.http.post<any>(url, null).pipe(
      map((response) => {
        console.log(response);
        
        if (response.message.includes('successfully')) {
          localStorage.removeItem('UserAbrevia');
          return true
        } else {
          return false
        }
      }))
  }

  getDecryptedUser() {
    const encryptedUser = localStorage.getItem('UserAbrevia');

    if (encryptedUser) {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedUser, 'secretKey');
      const decryptedUser = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
      return decryptedUser;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('UserAbrevia');
  }

  refreshToken(): Observable<boolean> {
    return of(true);
  }
}
