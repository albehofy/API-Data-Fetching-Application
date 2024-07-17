import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {
  private usersSubject = new BehaviorSubject<any[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // Fetch all users and update the BehaviorSubject
  gettingAllUsers(): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.base_url}/users`).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  // Fetch user details by UserId
  gettingUserDetails(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.base_url}/users/${id}`);
  }
}
