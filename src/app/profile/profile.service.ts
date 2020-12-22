import {Injectable} from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';

@Injectable()

export class ProfileService {
  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }

}
